import{B,U as b,k as w,l as v,J as f,a as m,c as $,d as r,P as y,e as i,m as s,M as p,b as S,n as l,h as C,O as k}from"./index-COyfQsJ6.js";import{s as D}from"./index-gM4L4YLK.js";import{s as I}from"./index-Tp5f2bvP.js";import{s as g}from"./index-Cl7_0X_7.js";var z=function(t){var o=t.dt;return`
.p-splitbutton {
    display: inline-flex;
    position: relative;
    border-radius: `.concat(o("splitbutton.border.radius"),`;
}

.p-splitbutton-button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0 none;
}

.p-splitbutton-button:focus-visible,
.p-splitbutton-dropdown:focus-visible {
    z-index: 1;
}

.p-splitbutton-button:not(:disabled):hover,
.p-splitbutton-button:not(:disabled):active {
    border-right: 0 none;
}

.p-splitbutton-dropdown {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.p-splitbutton .p-menu {
    min-width: 100%;
}

.p-splitbutton-fluid {
    display: flex;
}

.p-splitbutton-rounded .p-splitbutton-dropdown {
    border-top-right-radius: `).concat(o("splitbutton.rounded.border.radius"),`;
    border-bottom-right-radius: `).concat(o("splitbutton.rounded.border.radius"),`;
}

.p-splitbutton-rounded .p-splitbutton-button {
    border-top-left-radius: `).concat(o("splitbutton.rounded.border.radius"),`;
    border-bottom-left-radius: `).concat(o("splitbutton.rounded.border.radius"),`;
}

.p-splitbutton-raised {
    box-shadow: `).concat(o("splitbutton.raised.shadow"),`;
}
`)},V={root:function(t){var o=t.instance,u=t.props;return["p-splitbutton p-component",{"p-splitbutton-raised":u.raised,"p-splitbutton-rounded":u.rounded,"p-splitbutton-fluid":o.hasFluid}]},pcButton:"p-splitbutton-button",pcDropdown:"p-splitbutton-dropdown"},Z=B.extend({name:"splitbutton",theme:z,classes:V}),E={name:"BaseSplitButton",extends:v,props:{label:{type:String,default:null},icon:{type:String,default:null},model:{type:Array,default:null},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},appendTo:{type:[String,Object],default:"body"},disabled:{type:Boolean,default:!1},fluid:{type:Boolean,default:null},class:{type:null,default:null},style:{type:null,default:null},buttonProps:{type:null,default:null},menuButtonProps:{type:null,default:null},menuButtonIcon:{type:String,default:void 0},dropdownIcon:{type:String,default:void 0},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},plain:{type:Boolean,default:!1}},style:Z,provide:function(){return{$pcSplitButton:this,$parentInstance:this}}},P={name:"SplitButton",extends:E,inheritAttrs:!1,emits:["click"],inject:{$pcFluid:{default:null}},data:function(){return{id:this.$attrs.id,isExpanded:!1}},watch:{"$attrs.id":function(t){this.id=t||b()}},mounted:function(){var t=this;this.id=this.id||b(),this.$watch("$refs.menu.visible",function(o){t.isExpanded=o})},methods:{onDropdownButtonClick:function(t){t&&t.preventDefault(),this.$refs.menu.toggle({currentTarget:this.$el,relatedTarget:this.$refs.button.$el}),this.isExpanded=this.$refs.menu.visible},onDropdownKeydown:function(t){(t.code==="ArrowDown"||t.code==="ArrowUp")&&(this.onDropdownButtonClick(),t.preventDefault())},onDefaultButtonClick:function(t){this.isExpanded&&this.$refs.menu.hide(t),this.$emit("click",t)}},computed:{containerClass:function(){return[this.cx("root"),this.class]},hasFluid:function(){return w(this.fluid)?!!this.$pcFluid:this.fluid}},components:{PVSButton:I,PVSMenu:g,ChevronDownIcon:D}},T=["data-p-severity"];function F(n,t,o,u,a,d){var c=f("PVSButton"),h=f("PVSMenu");return m(),$("div",l({class:d.containerClass,style:n.style},n.ptmi("root"),{"data-p-severity":n.severity}),[r(c,l({type:"button",class:n.cx("pcButton"),label:n.label,disabled:n.disabled,severity:n.severity,text:n.text,icon:n.icon,outlined:n.outlined,size:n.size,fluid:n.fluid,"aria-label":n.label,onClick:d.onDefaultButtonClick},n.buttonProps,{pt:n.ptm("pcButton"),unstyled:n.unstyled}),y({default:i(function(){return[s(n.$slots,"default")]}),_:2},[n.$slots.icon?{name:"icon",fn:i(function(e){return[s(n.$slots,"icon",{class:p(e.class)},function(){return[S("span",l({class:[n.icon,e.class]},n.ptm("pcButton").icon,{"data-pc-section":"buttonicon"}),null,16)]})]}),key:"0"}:void 0]),1040,["class","label","disabled","severity","text","icon","outlined","size","fluid","aria-label","onClick","pt","unstyled"]),r(c,l({ref:"button",type:"button",class:n.cx("pcDropdown"),disabled:n.disabled,"aria-haspopup":"true","aria-expanded":a.isExpanded,"aria-controls":a.id+"_overlay",onClick:d.onDropdownButtonClick,onKeydown:d.onDropdownKeydown,severity:n.severity,text:n.text,outlined:n.outlined,size:n.size,unstyled:n.unstyled},n.menuButtonProps,{pt:n.ptm("pcDropdown")}),{icon:i(function(e){return[s(n.$slots,n.$slots.dropdownicon?"dropdownicon":"menubuttonicon",{class:p(e.class)},function(){return[(m(),C(k(n.menuButtonIcon||n.dropdownIcon?"span":"ChevronDownIcon"),l({class:[n.dropdownIcon||n.menuButtonIcon,e.class]},n.ptm("pcDropdown").icon,{"data-pc-section":"menubuttonicon"}),null,16,["class"]))]})]}),_:3},16,["class","disabled","aria-expanded","aria-controls","onClick","onKeydown","severity","text","outlined","size","unstyled","pt"]),r(h,{ref:"menu",id:a.id+"_overlay",model:n.model,popup:!0,autoZIndex:n.autoZIndex,baseZIndex:n.baseZIndex,appendTo:n.appendTo,unstyled:n.unstyled,pt:n.ptm("pcMenu")},y({_:2},[n.$slots.menuitemicon?{name:"itemicon",fn:i(function(e){return[s(n.$slots,"menuitemicon",{item:e.item,class:p(e.class)})]}),key:"0"}:void 0,n.$slots.item?{name:"item",fn:i(function(e){return[s(n.$slots,"item",{item:e.item,hasSubmenu:e.hasSubmenu,label:e.label,props:e.props})]}),key:"1"}:void 0]),1032,["id","model","autoZIndex","baseZIndex","appendTo","unstyled","pt"])],16,T)}P.render=F;export{P as s};
