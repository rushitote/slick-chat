(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],[,,function(e,s,t){e.exports={message:"Message_message__2p-3Q","message-user-image":"Message_message-user-image__1hev2","message-body":"Message_message-body__3ljLJ","message-user-name":"Message_message-user-name__TBf-M"}},function(e,s,t){e.exports={"user-list":"UsersList_user-list__23uSB","user-list-heading":"UsersList_user-list-heading__10W8x","user-list-users":"UsersList_user-list-users__2KleQ","user-image":"UsersList_user-image__3mPmC"}},function(e,s,t){e.exports={"input-box":"Input_input-box__3j1Qs",input:"Input_input__3PNbO","input-send-message":"Input_input-send-message__37fof"}},,,function(e,s,t){e.exports={"chat-messages":"Messages_chat-messages__2Rj0J","chat-messages-container":"Messages_chat-messages-container__1t7eF"}},,function(e,s,t){e.exports={"chat-window":"ChatWindow_chat-window__QvYlw"}},,,,,function(e,s,t){},,function(e,s,t){"use strict";t.r(s);var n=t(1),a=t.n(n),c=t(8),r=t.n(c),i=t(5),u=(t(14),t(9)),o=t.n(u),l=t(4),m=t.n(l),j=t.p+"static/media/send.2ce2a557.png",d=Object(n.createContext)({sent:[],received:[],sendMessage:function(e){},users:[]}),g=t(0);function b(e){var s=Object(n.useContext)(d),t=Object(n.useRef)(null),a=function(){if(null!==t.current&&0!==t.current.value.trim().length){var e={content:t.current.value,username:"Me"};s.sendMessage(e),t.current.value=""}};return Object(g.jsxs)("div",{className:m.a.input,children:[Object(g.jsx)("input",{type:"text",className:m.a["input-box"],ref:t,onKeyDown:function(e){"Enter"===e.key&&a()},placeholder:"Type your message here"}),Object(g.jsx)("div",{className:"".concat(m.a["input-send-message"]),children:Object(g.jsx)("img",{src:j,alt:"",onClick:a})})]})}var h=t(7),_=t.n(h),x=t(2),O=t.n(x);function p(e){return Object(g.jsxs)("div",{className:O.a.message,children:[Object(g.jsx)("img",{className:O.a["message-user-image"],alt:"User profile",src:e.image}),Object(g.jsxs)("div",{className:O.a["message-body"],children:[Object(g.jsx)("div",{className:O.a["message-user-name"],children:e.username}),Object(g.jsx)("div",{className:O.a["message-body-text"],children:e.content})]})]})}var f=t.p+"static/media/avatar.9eab2a92.png";function v(e){var s=Object(n.useContext)(d),t=Object(n.useRef)(null);return Object(n.useEffect)((function(){var e;null!==t.current&&(t.current.scrollTop=null===(e=t.current)||void 0===e?void 0:e.scrollHeight)}),[s]),Object(g.jsx)("div",{className:_.a["chat-messages-container"],ref:t,children:Object(g.jsx)("div",{className:_.a["chat-messages"],children:s.received.map((function(e){return Object(g.jsx)(p,{content:e.content,image:e.image||f,username:e.username},Math.random())}))})})}function N(e){return Object(g.jsxs)("div",{className:o.a["chat-window"],children:[Object(g.jsx)(v,{}),Object(g.jsx)(b,{})]})}var M=t(3),w=t.n(M);function y(e){var s=Object(n.useContext)(d);return Object(g.jsxs)("ul",{className:w.a["user-list"],children:[Object(g.jsx)("h1",{className:w.a["user-list-heading"],children:"Users"}),Object(g.jsx)("div",{className:w.a["user-list-users"],children:s.users.map((function(s){return Object(g.jsxs)("li",{children:[Object(g.jsx)("img",{src:e.image,alt:"",className:w.a["user-image"]}),s]},Math.random())}))})]})}function C(e){var s=Object(n.useState)([]),t=Object(i.a)(s,2),a=t[0],c=(t[1],Object(n.useState)([{content:"Hello World",username:"Shashwat",image:f},{content:"Hello World",username:"Anonymous",image:f}])),r=Object(i.a)(c,2),u=r[0],o=r[1],l=Object(n.useState)(["Shashwat","Varun","Rushikesh"]),m=Object(i.a)(l,2),j=m[0];m[1];return Object(g.jsxs)(d.Provider,{value:{sent:a,received:u,sendMessage:function(e){o((function(s){return s.concat(e)}))},users:j},children:[Object(g.jsx)(y,{image:f}),Object(g.jsx)(N,{})]})}r.a.render(Object(g.jsx)(a.a.StrictMode,{children:Object(g.jsx)(C,{})}),document.getElementById("root"))}],[[16,1,2]]]);
//# sourceMappingURL=main.32f16d8e.chunk.js.map