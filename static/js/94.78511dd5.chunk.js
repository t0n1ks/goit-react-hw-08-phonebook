"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[94],{94:function(e,a,n){n.r(a),n.d(a,{default:function(){return h}});var t=n(165),r=n(861),s=n(942),o=n(413),i=n(439),u=n(791),p=n(434),c=n(541),l=n(243),m={container:"RegistrationPage_container__ycFvY"},d=n(184);var h=function(){var e=(0,p.I0)(),a=(0,u.useState)({name:"",email:"",password:""}),n=(0,i.Z)(a,2),h=n[0],f=n[1],w=function(e){var a=e.target,n=a.name,t=a.value;f((function(e){return(0,o.Z)((0,o.Z)({},e),{},(0,s.Z)({},n,t))}))},v=function(){var a=(0,r.Z)((0,t.Z)().mark((function a(n){var r,s,o;return(0,t.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),a.prev=1,r=JSON.stringify({name:h.name,email:h.email,password:h.password}),a.next=5,l.Z.post("https://connections-api.herokuapp.com/users/signup",r,{headers:{"Content-Type":"application/json"}});case 5:s=a.sent,o=s.data.token,e((0,c.x4)({token:o})),f({name:"",email:"",password:""}),a.next=14;break;case 11:a.prev=11,a.t0=a.catch(1),console.error("Registration failed:",a.t0);case 14:case"end":return a.stop()}}),a,null,[[1,11]])})));return function(e){return a.apply(this,arguments)}}();return(0,d.jsxs)("div",{className:m.container,children:[" ",(0,d.jsx)("h2",{className:m.heading,children:"Registration"})," ",(0,d.jsxs)("form",{onSubmit:v,children:[(0,d.jsx)("input",{type:"text",name:"name",placeholder:"Name",value:h.name,onChange:w,required:!0,autoComplete:"current-password"}),(0,d.jsx)("input",{type:"email",name:"email",placeholder:"Email",value:h.email,onChange:w,required:!0,autoComplete:"current-password"}),(0,d.jsx)("input",{type:"password",name:"password",placeholder:"Password",value:h.password,onChange:w,required:!0,autoComplete:"current-password"}),(0,d.jsx)("button",{type:"submit",children:"Register"})]})]})}}}]);
//# sourceMappingURL=94.78511dd5.chunk.js.map