(this["webpackJsonpcards-project"]=this["webpackJsonpcards-project"]||[]).push([[0],{10:function(e,t,a){e.exports={container:"LoginPage_container__3Jd_S",loginBlock:"LoginPage_loginBlock__1bgG6",formBlock:"LoginPage_formBlock__2ccIJ",inputBlock:"LoginPage_inputBlock__ErTeu",labelText:"LoginPage_labelText__3HB39",linkForgotPassword:"LoginPage_linkForgotPassword__3TCs3",btnBlock:"LoginPage_btnBlock__i-mDh",span:"LoginPage_span__1Fdi7",linkSignUp:"LoginPage_linkSignUp__1a6lR",error:"LoginPage_error__1YJfE"}},106:function(e,t,a){},107:function(e,t,a){},230:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a(41),s=a.n(n),o=(a(106),a(107),a(60)),c=a.n(o),i=a(8),l=a(1),d=function(){return Object(l.jsx)("header",{className:c.a.header,children:Object(l.jsx)("nav",{className:c.a.nav,children:Object(l.jsxs)("ul",{children:[Object(l.jsx)(i.b,{to:"login",children:Object(l.jsx)("li",{children:"Login"})}),Object(l.jsx)(i.b,{to:"registration",children:Object(l.jsx)("li",{children:"Registration"})}),Object(l.jsx)(i.b,{to:"profile",children:Object(l.jsx)("li",{children:"Profile"})}),Object(l.jsx)(i.b,{to:"recoveryNewPassword",children:Object(l.jsx)("li",{children:"RecoveryNewPassword"})})]})})})},u=a(4),b=a(21),j=a(48),p=j.a().shape({email:j.b().email("Invalid email").required("Required"),password:j.b().min(4,"Too Long!").max(50,"Too Long!").required("Required")}),h=a(10),m=a.n(h),O=a(2),x=a(29),g=a(46),f=a.n(g),w=function(e){var t=e.red,a=e.className,r=Object(x.a)(e,["red","className"]),n="".concat(f.a.button," ").concat(t?f.a.red:f.a.default," ").concat(a);return Object(l.jsx)("button",Object(O.a)({className:n},r))},v=a(64),k=a.n(v),N=function(e){var t=e.type,a=e.onChange,r=e.onChangeText,n=e.onKeyPress,s=e.onEnter,o=e.error,c=(e.className,e.spanClassName,Object(x.a)(e,["type","onChange","onChangeText","onKeyPress","onEnter","error","className","spanClassName"])),i="".concat(k.a.errorText),d="".concat(k.a.input);return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("input",Object(O.a)({type:t,className:d,placeholder:"Enter...",onChange:function(e){a&&a(e),r&&r(e.currentTarget.value)},onKeyPress:function(e){n&&n(e),s&&"Enter"===e.key&&s()}},c)),Object(l.jsx)("span",{className:i,children:o})]})},P=a(47),y=a.n(P),A=function(e){e.type;var t=e.onChange,a=e.onChangeChecked,r=(e.className,e.spanClassName,e.children,Object(x.a)(e,["type","onChange","onChangeChecked","className","spanClassName","children"]));return Object(l.jsxs)("div",{className:y.a.checkboxBlock,children:[Object(l.jsx)("input",Object(O.a)({type:"checkbox",id:"checkbox",name:"checkbox",onChange:function(e){t&&t(e),a&&a(e.currentTarget.checked)},className:y.a.checkBox,disabled:!1},r)),Object(l.jsx)("label",{htmlFor:"checkbox",className:y.a.checkboxLabel,children:"remember me"})]})},S=a(6),T=a(24),B=a.n(T),R=a(34),C=a(100),E=a.n(C).a.create({baseURL:"https://neko-back.herokuapp.com/2.0/",withCredentials:!0}),L=function(e,t,a){return E.post("auth/login",{email:e,password:t,rememberMe:a})},F=function(e,t){return E.post("auth/register",{email:e,password:t})},W=function(){return E.post("auth/me",{})},Q={_id:null,email:null,name:null,avatar:null,publicCardPacksCount:null,isAuth:!1,error:null},V=function(e,t,a,r,n,s){return{type:"SET_AUTH_USER_DATA",payload:{_id:e,email:t,name:a,avatar:r,publicCardPacksCount:n,isAuth:s}}},G=function(e){return{type:"SET_AUTH_ERROR",error:e}},M=function(){var e=Object(S.c)((function(e){return e.login})),t=e.isAuth,a=e.error,r=Object(S.b)(),n=Object(b.a)({initialValues:{email:"",password:"",rememberMe:!1},validationSchema:p,onSubmit:function(e){var t=e.email,a=e.password,s=e.rememberMe;r(function(e,t,a){return function(){var r=Object(R.a)(B.a.mark((function r(n){var s,o,c,i,l,d,u,b;return B.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,L(e,t,a);case 3:s=r.sent,o=s.data,c=o._id,i=o.email,l=o.name,d=o.avatar,u=o.publicCardPacksCount,n(V(c,i,l,d,u,!0)),r.next=13;break;case 8:r.prev=8,r.t0=r.catch(0),b=r.t0.response?r.t0.response.data.error:r.t0.message+", more details in the console",n(G(b)),setTimeout((function(){n({type:"REMOVE_ERROR"})}),6e3);case 13:case"end":return r.stop()}}),r,null,[[0,8]])})));return function(e){return r.apply(this,arguments)}}()}(t,a,s)),n.resetForm()}});return t?Object(l.jsx)(u.a,{to:"/profile"}):Object(l.jsxs)("div",{className:m.a.container,children:[Object(l.jsxs)("div",{className:m.a.loginBlock,children:[Object(l.jsx)("h1",{children:"It-incubator"}),Object(l.jsx)("h2",{children:"Sign In"}),Object(l.jsxs)("form",{onSubmit:n.handleSubmit,className:m.a.formBlock,children:[Object(l.jsxs)("div",{className:m.a.inputBlock,children:[Object(l.jsx)("label",{htmlFor:"email",className:m.a.labelText,children:"Email"}),Object(l.jsx)(N,{id:"email",type:"email",name:"email",onChange:n.handleChange,value:n.values.email,error:n.errors.email})]}),Object(l.jsxs)("div",{className:m.a.inputBlock,children:[Object(l.jsx)("label",{htmlFor:"password",className:m.a.labelText,children:"Password"}),Object(l.jsx)(N,{id:"password",type:"password",name:"password",onChange:n.handleChange,value:n.values.password,error:n.errors.password})]}),Object(l.jsx)(A,{id:"checkbox",type:"checkbox",name:"rememberMe",onChange:n.handleChange,value:n.values.password}),Object(l.jsx)(i.b,{to:"/recoveryNewPassword",className:m.a.linkForgotPassword,children:Object(l.jsx)("span",{children:"Forgot Password"})}),Object(l.jsx)("div",{className:m.a.btnBlock,children:Object(l.jsx)(w,{type:"submit",disabled:n.isSubmitting,children:"Login"})}),Object(l.jsx)("span",{className:m.a.span,children:"Don't have an account?"}),Object(l.jsx)(i.b,{to:"/registration",className:m.a.linkSignUp,children:Object(l.jsx)("span",{children:"Sign Up"})})]})]}),a&&Object(l.jsx)("div",{className:m.a.error,children:Object(l.jsx)("span",{className:m.a.eText,children:a})})]})},_=a(23),H={isRegister:!1},D=a(7),I=a.n(D),J="data:image/png;base64,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",Z=function(){var e=Object(S.c)((function(e){return e.registration.isRegister})),t=Object(S.b)(),a=Object(r.useState)(0),n=Object(_.a)(a,2),s=n[0],o=n[1],c=Object(r.useState)(0),i=Object(_.a)(c,2),d=i[0],j=i[1],p=Object(b.a)({initialValues:{email:"",password:"",confirmPassword:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",0===e.password.length?t.password="enter the password":e.password.length<4&&(t.password="password is to small"),e.password!==e.confirmPassword&&(t.confirmPassword="confirm th password"),t},onSubmit:function(e){var a,r;t((a=e.email,r=e.password,function(){var e=Object(R.a)(B.a.mark((function e(t){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,F(a,r);case 3:e.sent,t({type:"login/SET-IS-REGISTER",value:!0}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}())),p.resetForm()}});if(e)return Object(l.jsx)(u.a,{to:"/login"});return Object(l.jsx)("div",{className:I.a.registrationWrap,children:Object(l.jsxs)("form",{onSubmit:p.handleSubmit,className:I.a.form,children:[Object(l.jsx)("h5",{children:"It-incubator"}),Object(l.jsx)("p",{children:"Sign Up"}),Object(l.jsxs)("div",{className:I.a.group,children:[Object(l.jsx)("input",Object(O.a)(Object(O.a)({onClick:function(){o(1)},type:"email",color:"black"},p.getFieldProps("email")),{},{onBlur:p.handleBlur})),Object(l.jsx)("span",{className:I.a.bar}),Object(l.jsx)("label",{className:1===s||p.values.email?"".concat(I.a.active):"",children:"Email"}),p.touched.email&&p.errors.email&&Object(l.jsx)("div",{style:{color:"red"},className:I.a.error,children:p.errors.email})]}),Object(l.jsxs)("div",{className:I.a.group,children:[Object(l.jsx)("input",Object(O.a)(Object(O.a)({onClick:function(){o(2)},type:1===d?"text":"password"},p.getFieldProps("password")),{},{onBlur:p.handleBlur})),Object(l.jsx)("span",{className:I.a.bar}),Object(l.jsx)("label",{className:2===s||p.values.password?"".concat(I.a.active):"",children:"Password"}),p.touched.password&&p.errors.password&&Object(l.jsx)("div",{style:{color:"red"},className:I.a.error,children:p.errors.password}),Object(l.jsx)("img",{src:J,alt:"eye",onMouseDown:function(){j(1)},onMouseUp:function(){j(0)}})]}),Object(l.jsxs)("div",{className:"".concat(I.a.group," ").concat(I.a.lastElement),children:[Object(l.jsx)("input",Object(O.a)(Object(O.a)({onClick:function(){o(3)},type:2===d?"text":"password"},p.getFieldProps("confirmPassword")),{},{onBlur:p.handleBlur})),Object(l.jsx)("span",{className:I.a.bar}),Object(l.jsx)("label",{className:3===s||p.values.confirmPassword?"".concat(I.a.active):"",children:"Confirm password"}),p.touched.confirmPassword&&p.errors.confirmPassword&&Object(l.jsx)("div",{style:{color:"red"},className:I.a.error,children:p.errors.confirmPassword}),Object(l.jsx)("img",{src:J,alt:"eye",onMouseDown:function(){j(2)},onMouseUp:function(){j(0)}})]}),Object(l.jsxs)("div",{className:I.a.buttons,children:[Object(l.jsx)("button",{onClick:function(){p.resetForm()},children:"Cancel"}),Object(l.jsx)("button",{type:"submit",children:"Register"})]})]})})},z=function(){var e=Object(S.c)((function(e){return e.login.isAuth})),t=Object(S.b)();return Object(r.useEffect)((function(){t(function(){var e=Object(R.a)(B.a.mark((function e(t){var a,r,n,s,o,c,i,l;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,W();case 3:a=e.sent,r=a.data,n=r._id,s=r.email,o=r.name,c=r.avatar,i=r.publicCardPacksCount,t(V(n,s,o,c,i,!0)),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(0),l=e.t0.response?e.t0.response.data.error:e.t0.message+", more details in the console",t(G(l)),setTimeout((function(){t({type:"REMOVE_ERROR"})}),6e3);case 13:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}())}),[e]),Object(l.jsx)("div",{children:"Profile page"})},K={email:"nya@nya.nya",from:"test-front-admin <ai73a@yandex.by>",message:"<div style=\"background-color: lime; padding: 15px\">\npassword recovery link:<a href='http://localhost:3000/#/set-new-password/$token$'>\nlink</a>\n</div>",emailSent:!1},U=function(e){return function(t){(function(e){return E.post("auth/forgot",e)})(e).then((function(a){t({type:"recoveryPassword/FORGOT",email:e.email})})).catch((function(e){return console.log(e)}))}},q=function(){var e=Object(S.c)((function(e){return e.recoveryPassword.emailSent})),t=Object(S.b)(),a=Object(b.a)({initialValues:{email:"",from:"test-front-admin <ai73a@yandex.by>",message:"<div style=\"background-color: lime; padding: 15px\">\n            password recovery link:<a href='http://localhost:3000/cards-project#/enterNewPassword/$token$'>\n                link</a>\n                      </div>"},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",t},onSubmit:function(e){t(U(e)),a.resetForm()}});return e?Object(l.jsx)(u.a,{to:"/emailSent"}):Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:a.handleSubmit,children:[Object(l.jsx)("input",Object(O.a)({},a.getFieldProps("email"))),a.touched.email&&a.errors.email?Object(l.jsx)("div",{style:{color:"red"},children:a.errors.email}):null,Object(l.jsx)("button",{type:"submit",children:"sent"})]})})},X={resetPasswordToken:" ",password:" ",passwordChangedSuccess:!1},Y=function(e){return function(t){(function(e){return E.post("auth/set-new-password",e)})(e).then((function(a){t({type:"enterNewPassword/NEW-PASSWORD",data:e})})).catch((function(e){return console.log(e)}))}},$=function(){var e=Object(S.b)(),t=Object(u.g)().token,a=Object(S.c)((function(e){return e.enterNewPassword.passwordChangedSuccess})),r=Object(b.a)({initialValues:{resetPasswordToken:t,password:"",passwordVerification:""},validate:function(e){var t={};return e.password?e.password.length<5?t.password="must be more than 4 characters":e.password!==e.passwordVerification&&(t.passwordVerification="Passwords don't match"):t.password="Required",t},onSubmit:function(t){e(Y(t))}});return a?Object(l.jsx)(u.a,{to:"/login"}):Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:r.handleSubmit,children:[Object(l.jsxs)("div",{children:[Object(l.jsx)("input",Object(O.a)({type:"password"},r.getFieldProps("password"))),r.touched.password&&r.errors.password?Object(l.jsx)("div",{style:{color:"red"},children:r.errors.password}):null]}),Object(l.jsxs)("div",{children:[Object(l.jsx)("input",Object(O.a)({type:"password"},r.getFieldProps("passwordVerification"))),r.touched.passwordVerification&&r.errors.passwordVerification?Object(l.jsx)("div",{style:{color:"red"},children:r.errors.passwordVerification}):null]}),Object(l.jsx)("button",{type:"submit",children:"sent"})]})})},ee=function(){return Object(l.jsx)("div",{style:{color:"white",position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:"go to your email, there was a link to change your password"})},te=function(e){var t=e.children;return Object(S.c)((function(e){return e.login.isAuth}))?Object(l.jsxs)(l.Fragment,{children:[" ",t," "]}):Object(l.jsx)(u.a,{to:"/login"})};var ae=function(){return Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)(d,{}),Object(l.jsxs)(u.d,{children:[Object(l.jsx)(u.b,{exact:!0,path:"/",render:function(){return Object(l.jsx)(te,{children:Object(l.jsx)(u.a,{to:"/profile"})})}}),Object(l.jsx)(u.b,{path:"/profile",render:function(){return Object(l.jsx)(te,{children:Object(l.jsx)(z,{})})}}),Object(l.jsx)(u.b,{path:"/login",render:function(){return Object(l.jsx)(M,{})}}),Object(l.jsx)(u.b,{path:"/registration",render:function(){return Object(l.jsx)(Z,{})}}),Object(l.jsx)(u.b,{path:"/recoveryNewPassword",render:function(){return Object(l.jsx)(q,{})}}),Object(l.jsx)(u.b,{path:"/enterNewPassword",render:function(){return Object(l.jsx)($,{})}}),Object(l.jsx)(u.b,{path:"/emailSent",render:function(){return Object(l.jsx)(ee,{})}})]})]})},re=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,231)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,s=t.getLCP,o=t.getTTFB;a(e),r(e),n(e),s(e),o(e)}))},ne=a(49),se=a(101),oe=Object(ne.b)({login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_AUTH_USER_DATA":return Object(O.a)(Object(O.a)({},e),t.payload);case"SET_AUTH_ERROR":return Object(O.a)(Object(O.a)({},e),{},{error:t.error});case"REMOVE_ERROR":return Object(O.a)(Object(O.a)({},e),{},{error:null});default:return e}},registration:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-REGISTER":return Object(O.a)(Object(O.a)({},e),{},{isRegister:t.value});default:return e}},recoveryPassword:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"recoveryPassword/FORGOT":return Object(O.a)(Object(O.a)({},e),{},{email:t.email,emailSent:!0});default:return e}},enterNewPassword:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"enterNewPassword/NEW-PASSWORD":return Object(O.a)(Object(O.a)({},e),{},{password:t.data.password,resetPasswordToken:t.data.resetPasswordToken,passwordChangedSuccess:!0});default:return e}},profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e}}),ce=Object(ne.c)(oe,Object(ne.a)(se.a));s.a.render(Object(l.jsx)(i.a,{children:Object(l.jsx)(S.a,{store:ce,children:Object(l.jsx)(ae,{})})}),document.getElementById("root")),re()},46:function(e,t,a){e.exports={button:"SuperButton_button__2GJEL"}},47:function(e,t,a){e.exports={checkboxBlock:"SuperCheckBox_checkboxBlock__3O0y9",checkBox:"SuperCheckBox_checkBox__3zDOA",checkboxLabel:"SuperCheckBox_checkboxLabel__bsgdI"}},60:function(e,t,a){e.exports={header:"Header_header__A-mrO",nav:"Header_nav__1Crzp"}},64:function(e,t,a){e.exports={input:"SuperInput_input__1gKPY",errorText:"SuperInput_errorText__10eCs"}},7:function(e,t,a){e.exports={registrationWrap:"RegistrationPage_registrationWrap__38TB8",form:"RegistrationPage_form__2sJq1",group:"RegistrationPage_group__t95bT",lastElement:"RegistrationPage_lastElement__3a7ke",active:"RegistrationPage_active__3PB-1",bar:"RegistrationPage_bar__2t_JT",error:"RegistrationPage_error__2dnAo",buttons:"RegistrationPage_buttons__13tlK"}}},[[230,1,2]]]);
//# sourceMappingURL=main.6533c696.chunk.js.map