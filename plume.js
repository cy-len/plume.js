// Used to store all the global data, for instance the authentication tokens, etc...
var globalStorage = {
    mainView: null,
    token: ""
};

var onloadActions = []; // Array of functions

window.onload = () => {
    for (let e of onloadActions)
    {
        if (e instanceof Function)
        {
            e();
        }
    }
}

function executeFunctionByName(functionName /*, args */)
{
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();

    var context = window;

    for(let i = 0; i < namespaces.length; i++)
    {
        context = context[namespaces[i]];
    }

    return context[func].apply(context, args);
}

function updateRoutine(element)
{
    if (element.updateOnShow)
    {
        element.update();
    }

    for (let c of element.children)
    {
        updateRoutine(c);
    }
}

class MainView extends HTMLElement
{
    constructor()
    {
        super();

        this.default = null;
        this.routes = {};

        globalStorage.mainView = this;

        onloadActions.push(() => {
            this.detectRoutes();

            this.route();
        });

        window.onpopstate = () => {
            this.route();
        }
    }

    addRoute(path, viewElement)
    {
        this.routes[path] = {
            element: viewElement
        };
    }

    detectRoutes()
    {
        for (let e of this.children)
        {
            if (e.nodeName.toLowerCase() == "page-route")
            {
                this.addRoute(e.path(), e);
            }
        }
    }

    route()
    {
        let path = window.location.pathname;
        let r = this.routes[path];

        if (!r)
        {
            if (this.default)
            {
                this.setContent(this.default);
            }

            return;
        }

        if (window.location.search != "")
        {
            for (let widget of r.element.children)
            {
                if (widget.setUrlArgs && widget.setUrlArgs instanceof Function)
                {
                    widget.setUrlArgs(this.parseArgs(window.location.search));
                }
            }
        }

        this.setContent(r.element);
    }

    setContent(element)
    {
        for (let e of this.children)
        {
            if (e != element)
            {
                e.style.display = "none";
            }
        }

        element.style.display = "block";
        updateRoutine(element);
    }

    parseArgs(str)
    {
        let args = {};

        str = str.slice(1); // remove the ?
        let argsStr = str.split("&");

        for (let a of argsStr)
        {
            let pair = a.split("=");

            args[pair[0]] = pair[1];
        }

        return args;
    }
}

class Route extends HTMLElement
{
    constructor()
    {
        super();
    }

    path()
    {
        return this.getAttribute("path");
    }
}

class NavigationLink extends HTMLElement
{
    constructor()
    {
        super();

        // this.style.cursor = "pointer";
        this.onclick = () => {
            this.go();
        }
    }

    go()
    {
        let href = this.getAttribute("href");
        
        if (!href)
        {
            return;
        }

        window.history.pushState({}, "", href);
        globalStorage.mainView.route(href);
    }

    set href(str)
    {
        this.setAttribute("href", str);
    }
}

class SmartElement extends HTMLElement
{
    constructor()
    {
        super();

        this.updateOnShow = true;
    }

    /*
    Override update() yourself
    */
    update() {}
}

class FlipFlop extends SmartElement
{
    constructor()
    {
        super();

        this.updateOnShow = true;
    }

    update()
    {
        let fname = this.getAttribute("function");
        let result = executeFunctionByName(fname);

        let flip = this.children[0],
            flop = this.children[1];

        if (result)
        {
            this.showAndHide(flip, flop);
        }
        else
        {
            this.showAndHide(flop, flip);
        }
    }

    showAndHide(show, hide)
    {
        show.style.display = "block";
        if (show.updateOnShow)
        {
            show.update();
        }

        hide.style.display = "none";
    }
}

customElements.define("main-view", MainView);
customElements.define("page-route", Route);
customElements.define("navigation-link", NavigationLink);
customElements.define("flip-flop", FlipFlop);