const applyStyle = function(elem,style){
    for(let key in style){
        elem.style[key] = style[key];
    }
    return elem;
};
const unsetStyle = function(elem,style){
    for(let key in style){
        elem.style[key] = "unset";
    }
    return elem;
};
const applyAttrs = function(elem,attrs){
    for(let key in attrs){
        elem.setAttribute(key, attrs[key]);
    }
    return elem;
};
const Elem = function(parent,params){
    if(!params){
        params = parent;
        parent = undefined;
    }
    const {query,tag="div",attrs={},style={},children=[],child,click=()=>{},load=()=>{},self=()=>{},id,inner,hover,on={},...others} = params;
    let element = query?document.querySelector(query):document.createElement(tag);
    if(id)element.id=id;
    if(child)children.push(child);
    applyStyle(element,style);
    applyAttrs(element,attrs);
    if(inner){
        element.innerHTML = inner;
    }else{
        for(let child of children){
            if(typeof child === "string"){
                element.appendChild(document.createTextNode(child));
            }else{
                element.appendChild(Elem(child));
            }
        }
    }
    element.onclick = click;
    for(let key in on){
        element.addEventListener(key,on[key]);
    }
    for(let key in others){
        element[key] = others[key];
    }
    if(hover){
        element.addEventListener("mouseenter",()=>{
            applyStyle(element,hover);
        });
        element.addEventListener("mouseleave",()=>{
            unsetStyle(element,hover);
            applyStyle(element,style);
        });
    }
    self(element);
    // defer
    setTimeout(()=>load(element),0);
    if(parent){
        parent.appendChild(element);
    }
    return element;
};
