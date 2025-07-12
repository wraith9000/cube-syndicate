"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4708],{84708:(e,t,i)=>{i.r(t),i.d(t,{AppKitModal:()=>ey,W3mModal:()=>eg,W3mModalBase:()=>ev});var o=i(47514),a=i(10121),r=i(7688),s=i(60500),n=i(96641),c=i(40166),l=i(90906),w=i(54252),d=i(65819),p=i(19628),u=i(83562);let h={isUnsupportedChainView:()=>"UnsupportedChain"===p.I.state.view||"SwitchNetwork"===p.I.state.view&&p.I.state.history.includes("UnsupportedChain"),async safeClose(){if(this.isUnsupportedChainView()||await u.U.isSIWXCloseDisabled())return void c.W.shake();c.W.close()}};var m=i(7478),v=i(5517),g=i(35558),y=i(28898),f=i(34397),b=i(97265),k=i(54166);let x=(0,f.AH)`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`,C=class extends f.WF{render(){return(0,f.qy)`<slot></slot>`}};C.styles=[b.W5,x],C=function(e,t,i,o){var a,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,i,s):a(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s}([(0,k.E)("wui-card")],C),i(98160);var S=i(79277),W=i(96504);i(58840),i(98750),i(43804);let q=(0,f.AH)`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`;var I=function(e,t,i,o){var a,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,i,s):a(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let N=class extends f.WF{constructor(){super(...arguments),this.message="",this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="info"}render(){return this.style.cssText=`
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `,(0,f.qy)`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){S.h.close()}};N.styles=[b.W5,q],I([(0,W.MZ)()],N.prototype,"message",void 0),I([(0,W.MZ)()],N.prototype,"backgroundColor",void 0),I([(0,W.MZ)()],N.prototype,"iconColor",void 0),I([(0,W.MZ)()],N.prototype,"icon",void 0),N=I([(0,k.E)("wui-alertbar")],N);let R=(0,o.AH)`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`;var A=function(e,t,i,o){var a,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,i,s):a(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let E={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"exclamationTriangle"}},O=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.open=S.h.state.open,this.onOpen(!0),this.unsubscribe.push(S.h.subscribeKey("open",e=>{this.open=e,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{message:e,variant:t}=S.h.state,i=E[t];return(0,o.qy)`
      <wui-alertbar
        message=${e}
        backgroundColor=${i?.backgroundColor}
        iconColor=${i?.iconColor}
        icon=${i?.icon}
      ></wui-alertbar>
    `}onOpen(e){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):e||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};O.styles=R,A([(0,a.wk)()],O.prototype,"open",void 0),O=A([(0,y.EM)("w3m-alertbar")],O);var T=i(11076),$=i(34735),P=i(74623),D=i(32836);let j=(0,f.AH)`
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  @media (max-width: 700px) {
    button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }
`;var H=function(e,t,i,o){var a,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,i,s):a(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let M=class extends f.WF{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="inherit"}render(){let e="lg"===this.size?"--wui-border-radius-xs":"--wui-border-radius-xxs",t="lg"===this.size?"--wui-spacing-1xs":"--wui-spacing-2xs";return this.style.cssText=`
    --local-border-radius: var(${e});
    --local-padding: var(${t});
`,(0,f.qy)`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `}};M.styles=[b.W5,b.fD,b.ck,j],H([(0,W.MZ)()],M.prototype,"size",void 0),H([(0,W.MZ)({type:Boolean})],M.prototype,"disabled",void 0),H([(0,W.MZ)()],M.prototype,"icon",void 0),H([(0,W.MZ)()],M.prototype,"iconColor",void 0),M=H([(0,k.E)("wui-icon-link")],M),i(25322),i(89556);let B=(0,f.AH)`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var L=function(e,t,i,o){var a,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,i,s):a(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let z=class extends f.WF{constructor(){super(...arguments),this.imageSrc=""}render(){return(0,f.qy)`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`}imageTemplate(){return this.imageSrc?(0,f.qy)`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`:(0,f.qy)`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`}};z.styles=[b.W5,b.fD,b.ck,B],L([(0,W.MZ)()],z.prototype,"imageSrc",void 0),z=L([(0,k.E)("wui-select")],z),i(2745),i(22724);var U=i(26128);let K=(0,o.AH)`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;var X=function(e,t,i,o){var a,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,i,s):a(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let F=["SmartSessionList"];function Z(){let e=p.I.state.data?.connector?.name,t=p.I.state.data?.wallet?.name,i=p.I.state.data?.network?.name,o=t??e,a=w.a.getConnectors(),r=1===a.length&&a[0]?.id==="w3m-email";return{Connect:`Connect ${r?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",ConnectingExternal:o??"Connect Wallet",ConnectingWalletConnect:o??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview convert",Downloads:o?`Get ${o}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",Profile:void 0,SwitchNetwork:i??"Switch Network",SwitchAddress:"Switch Address",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select token",SwapPreview:"Preview swap",WalletSend:"Send",WalletSendPreview:"Review send",WalletSendSelectToken:"Select Token",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a wallet?",ConnectWallets:"Connect wallet",ConnectSocials:"All socials",ConnectingSocial:T.U.state.socialProvider?T.U.state.socialProvider:"Connect Social",ConnectingMultiChain:"Select chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Payment in progress"}}let _=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.heading=Z()[p.I.state.view],this.network=l.W.state.activeCaipNetwork,this.networkImage=$.$.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=p.I.state.view,this.viewDirection="",this.headerText=Z()[p.I.state.view],this.unsubscribe.push(P.j.subscribeNetworkImages(()=>{this.networkImage=$.$.getNetworkImage(this.network)}),p.I.subscribeKey("view",e=>{setTimeout(()=>{this.view=e,this.headerText=Z()[e]},U.o.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),l.W.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=$.$.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,o.qy)`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){D.E.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),p.I.push("WhatIsAWallet")}async onClose(){await h.safeClose()}rightHeaderTemplate(){let e=n.H?.state?.features?.smartSessions;return"Account"===p.I.state.view&&e?(0,o.qy)`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${()=>p.I.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return(0,o.qy)`
      <wui-icon-link
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `}titleTemplate(){let e=F.includes(this.view);return(0,o.qy)`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${e?(0,o.qy)`<wui-tag variant="main">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){let{view:e}=p.I.state,t="Connect"===e,i=n.H.state.enableEmbedded,a=n.H.state.enableNetworkSwitch;return"Account"===e&&a?(0,o.qy)`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${(0,r.J)(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${(0,r.J)(this.networkImage)}
      ></wui-select>`:this.showBack&&!("ApproveTransaction"===e||"ConnectingSiwe"===e||t&&i)?(0,o.qy)`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`:(0,o.qy)`<wui-icon-link
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`}onNetworks(){this.isAllowedNetworkSwitch()&&(D.E.sendEvent({type:"track",event:"CLICK_NETWORKS"}),p.I.push("Networks"))}isAllowedNetworkSwitch(){let e=l.W.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,i=e?.find(({id:e})=>e===this.network?.id);return t||!i}getPadding(){return this.heading?["l","2l","l","2l"]:["0","2l","0","2l"]}onViewChange(){let{history:e}=p.I.state,t=U.o.VIEW_DIRECTION.Next;e.length<this.prevHistoryLength&&(t=U.o.VIEW_DIRECTION.Prev),this.prevHistoryLength=e.length,this.viewDirection=t}async onHistoryChange(){let{history:e}=p.I.state,t=this.shadowRoot?.querySelector("#dynamic");e.length>1&&!this.showBack&&t?(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):e.length<=1&&this.showBack&&t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){p.I.goBack()}};_.styles=K,X([(0,a.wk)()],_.prototype,"heading",void 0),X([(0,a.wk)()],_.prototype,"network",void 0),X([(0,a.wk)()],_.prototype,"networkImage",void 0),X([(0,a.wk)()],_.prototype,"showBack",void 0),X([(0,a.wk)()],_.prototype,"prevHistoryLength",void 0),X([(0,a.wk)()],_.prototype,"view",void 0),X([(0,a.wk)()],_.prototype,"viewDirection",void 0),X([(0,a.wk)()],_.prototype,"headerText",void 0),_=X([(0,y.EM)("w3m-header")],_),i(4537);let V=(0,f.AH)`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`;var Y=function(e,t,i,o){var a,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,i,s):a(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let G=class extends f.WF{constructor(){super(...arguments),this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="checkmark",this.message="",this.loading=!1,this.iconType="default"}render(){return(0,f.qy)`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return this.loading?(0,f.qy)`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:"default"===this.iconType?(0,f.qy)`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>`:(0,f.qy)`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`}};G.styles=[b.W5,V],Y([(0,W.MZ)()],G.prototype,"backgroundColor",void 0),Y([(0,W.MZ)()],G.prototype,"iconColor",void 0),Y([(0,W.MZ)()],G.prototype,"icon",void 0),Y([(0,W.MZ)()],G.prototype,"message",void 0),Y([(0,W.MZ)()],G.prototype,"loading",void 0),Y([(0,W.MZ)()],G.prototype,"iconType",void 0),G=Y([(0,k.E)("wui-snackbar")],G);let J=(0,o.AH)`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var Q=function(e,t,i,o){var a,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,i,s):a(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let ee={loading:void 0,success:{backgroundColor:"success-100",iconColor:"success-100",icon:"checkmark"},error:{backgroundColor:"error-100",iconColor:"error-100",icon:"close"}},et=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=v.P.state.open,this.unsubscribe.push(v.P.subscribeKey("open",e=>{this.open=e,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(e=>e())}render(){let{message:e,variant:t,svg:i}=v.P.state,a=ee[t],{icon:r,iconColor:s}=i??a??{};return(0,o.qy)`
      <wui-snackbar
        message=${e}
        backgroundColor=${a?.backgroundColor}
        iconColor=${s}
        icon=${r}
        .loading=${"loading"===t}
      ></wui-snackbar>
    `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),v.P.state.autoClose&&(this.timeout=setTimeout(()=>v.P.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};et.styles=J,Q([(0,a.wk)()],et.prototype,"open",void 0),et=Q([(0,y.EM)("w3m-snackbar")],et);var ei=i(7972),eo=i(29094),ea=i(92555);let er=(0,ei.BX)({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),es=(0,ea.X)({state:er,subscribe:e=>(0,ei.B1)(er,()=>e(er)),subscribeKey:(e,t)=>(0,eo.u$)(er,e,t),showTooltip({message:e,triggerRect:t,variant:i}){er.open=!0,er.message=e,er.triggerRect=t,er.variant=i},hide(){er.open=!1,er.message="",er.triggerRect={width:0,height:0,top:0,left:0}}});i(21330);let en=(0,o.AH)`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    color: var(--wui-color-bg-100);
    position: fixed;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--w3m-modal-width) - var(--wui-spacing-xl));
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: var(--wui-color-bg-150);
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;var ec=function(e,t,i,o){var a,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,i,s):a(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let el=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.open=es.state.open,this.message=es.state.message,this.triggerRect=es.state.triggerRect,this.variant=es.state.variant,this.unsubscribe.push(es.subscribe(e=>{this.open=e.open,this.message=e.message,this.triggerRect=e.triggerRect,this.variant=e.variant}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){this.dataset.variant=this.variant;let e=this.triggerRect.top,t=this.triggerRect.left;return this.style.cssText=`
    --w3m-tooltip-top: ${e}px;
    --w3m-tooltip-left: ${t}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;
    --w3m-tooltip-display: ${this.open?"flex":"none"};
    --w3m-tooltip-opacity: ${+!!this.open};
    `,(0,o.qy)`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`}};el.styles=[en],ec([(0,a.wk)()],el.prototype,"open",void 0),ec([(0,a.wk)()],el.prototype,"message",void 0),ec([(0,a.wk)()],el.prototype,"triggerRect",void 0),ec([(0,a.wk)()],el.prototype,"variant",void 0),el=ec([(0,y.EM)("w3m-tooltip"),(0,y.EM)("w3m-tooltip")],el);let ew=(0,o.AH)`
  :host {
    --prev-height: 0px;
    --new-height: 0px;
    display: block;
  }

  div.w3m-router-container {
    transform: translateY(0);
    opacity: 1;
  }

  div.w3m-router-container[view-direction='prev'] {
    animation:
      slide-left-out 150ms forwards ease,
      slide-left-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  div.w3m-router-container[view-direction='next'] {
    animation:
      slide-right-out 150ms forwards ease,
      slide-right-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;var ed=function(e,t,i,o){var a,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,i,s):a(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let ep=class extends o.WF{constructor(){super(),this.resizeObserver=void 0,this.prevHeight="0px",this.prevHistoryLength=1,this.unsubscribe=[],this.view=p.I.state.view,this.viewDirection="",this.unsubscribe.push(p.I.subscribeKey("view",e=>this.onViewChange(e)))}firstUpdated(){this.resizeObserver=new ResizeObserver(([e])=>{let t=`${e?.contentRect.height}px`;"0px"!==this.prevHeight&&(this.style.setProperty("--prev-height",this.prevHeight),this.style.setProperty("--new-height",t),this.style.animation="w3m-view-height 150ms forwards ease",this.style.height="auto"),setTimeout(()=>{this.prevHeight=t,this.style.animation="unset"},U.o.ANIMATION_DURATIONS.ModalHeight)}),this.resizeObserver?.observe(this.getWrapper())}disconnectedCallback(){this.resizeObserver?.unobserve(this.getWrapper()),this.unsubscribe.forEach(e=>e())}render(){return(0,o.qy)`<div class="w3m-router-container" view-direction="${this.viewDirection}">
      ${this.viewTemplate()}
    </div>`}viewTemplate(){switch(this.view){case"AccountSettings":return(0,o.qy)`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return(0,o.qy)`<w3m-account-view></w3m-account-view>`;case"AllWallets":return(0,o.qy)`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return(0,o.qy)`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return(0,o.qy)`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return(0,o.qy)`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":default:return(0,o.qy)`<w3m-connect-view></w3m-connect-view>`;case"Create":return(0,o.qy)`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return(0,o.qy)`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return(0,o.qy)`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return(0,o.qy)`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return(0,o.qy)`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return(0,o.qy)`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return(0,o.qy)`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return(0,o.qy)`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"Downloads":return(0,o.qy)`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return(0,o.qy)`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return(0,o.qy)`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return(0,o.qy)`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return(0,o.qy)`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return(0,o.qy)`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return(0,o.qy)`<w3m-network-switch-view></w3m-network-switch-view>`;case"Profile":return(0,o.qy)`<w3m-profile-view></w3m-profile-view>`;case"SwitchAddress":return(0,o.qy)`<w3m-switch-address-view></w3m-switch-address-view>`;case"Transactions":return(0,o.qy)`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return(0,o.qy)`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampActivity":return(0,o.qy)`<w3m-onramp-activity-view></w3m-onramp-activity-view>`;case"OnRampTokenSelect":return(0,o.qy)`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return(0,o.qy)`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return(0,o.qy)`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return(0,o.qy)`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return(0,o.qy)`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return(0,o.qy)`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return(0,o.qy)`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return(0,o.qy)`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return(0,o.qy)`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return(0,o.qy)`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return(0,o.qy)`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return(0,o.qy)`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return(0,o.qy)`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WhatIsABuy":return(0,o.qy)`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return(0,o.qy)`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return(0,o.qy)`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return(0,o.qy)`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return(0,o.qy)`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return(0,o.qy)`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return(0,o.qy)`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return(0,o.qy)`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return(0,o.qy)`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return(0,o.qy)`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return(0,o.qy)`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return(0,o.qy)`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return(0,o.qy)`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case"Pay":return(0,o.qy)`<w3m-pay-view></w3m-pay-view>`;case"PayLoading":return(0,o.qy)`<w3m-pay-loading-view></w3m-pay-loading-view>`}}onViewChange(e){es.hide();let t=U.o.VIEW_DIRECTION.Next,{history:i}=p.I.state;i.length<this.prevHistoryLength&&(t=U.o.VIEW_DIRECTION.Prev),this.prevHistoryLength=i.length,this.viewDirection=t,setTimeout(()=>{this.view=e},U.o.ANIMATION_DURATIONS.ViewTransition)}getWrapper(){return this.shadowRoot?.querySelector("div")}};ep.styles=ew,ed([(0,a.wk)()],ep.prototype,"view",void 0),ed([(0,a.wk)()],ep.prototype,"viewDirection",void 0),ep=ed([(0,y.EM)("w3m-router")],ep);let eu=(0,o.AH)`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.appkit-modal) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;var eh=function(e,t,i,o){var a,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,i,s):a(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let em="scroll-lock";class ev extends o.WF{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=n.H.state.enableEmbedded,this.open=c.W.state.open,this.caipAddress=l.W.state.activeCaipAddress,this.caipNetwork=l.W.state.activeCaipNetwork,this.shake=c.W.state.shake,this.filterByNamespace=w.a.state.filterByNamespace,this.initializeTheming(),d.N.prefetchAnalyticsConfig(),this.unsubscribe.push(c.W.subscribeKey("open",e=>e?this.onOpen():this.onClose()),c.W.subscribeKey("shake",e=>this.shake=e),l.W.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),l.W.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),n.H.subscribeKey("enableEmbedded",e=>this.enableEmbedded=e),w.a.subscribeKey("filterByNamespace",e=>{this.filterByNamespace===e||l.W.getAccountData(e)?.caipAddress||(d.N.fetchRecommendedWallets(),this.filterByNamespace=e)}))}firstUpdated(){if(this.caipAddress){if(this.enableEmbedded){c.W.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return(this.style.cssText=`
      --local-border-bottom-mobile-radius: ${this.enableEmbedded?"clamp(0px, var(--wui-border-radius-l), 44px)":"0px"};
    `,this.enableEmbedded)?(0,o.qy)`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?(0,o.qy)`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return(0,o.qy)` <wui-card
      shake="${this.shake}"
      data-embedded="${(0,r.J)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){await h.safeClose()}initializeTheming(){let{themeVariables:e,themeMode:t}=m.W.state,i=y.Zv.getColorTheme(t);(0,y.RF)(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),v.P.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){let e=document.createElement("style");e.dataset.w3m=em,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){let e=document.head.querySelector(`style[data-w3m="${em}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;let e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){let{tagName:i}=t.target;!i||i.includes("W3M-")||i.includes("WUI-")||e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(e){let t=l.W.state.isSwitchingNamespace,i=g.w.getPlainAddress(e);i||t?t&&i&&p.I.goBack():c.W.close(),await u.U.initializeIfEnabled(),this.caipAddress=e,l.W.setIsSwitchingNamespace(!1)}onNewNetwork(e){let t=this.caipNetwork,i=t?.caipNetworkId?.toString(),o=t?.chainNamespace,a=e?.caipNetworkId?.toString(),r=e?.chainNamespace,n=i!==a,w=t?.name===s.o.UNSUPPORTED_NETWORK_NAME,d="ConnectingExternal"===p.I.state.view,u=!l.W.getAccountData(e?.chainNamespace)?.caipAddress,h="UnsupportedChain"===p.I.state.view,m=c.W.state.open,v=!1;m&&!d&&(u?n&&(v=!0):h?v=!0:n&&o===r&&!w&&(v=!0)),v&&"SIWXSignMessage"!==p.I.state.view&&p.I.goBack(),this.caipNetwork=e}prefetch(){this.hasPrefetched||(d.N.prefetch(),d.N.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}ev.styles=eu,eh([(0,a.MZ)({type:Boolean})],ev.prototype,"enableEmbedded",void 0),eh([(0,a.wk)()],ev.prototype,"open",void 0),eh([(0,a.wk)()],ev.prototype,"caipAddress",void 0),eh([(0,a.wk)()],ev.prototype,"caipNetwork",void 0),eh([(0,a.wk)()],ev.prototype,"shake",void 0),eh([(0,a.wk)()],ev.prototype,"filterByNamespace",void 0);let eg=class extends ev{};eg=eh([(0,y.EM)("w3m-modal")],eg);let ey=class extends ev{};ey=eh([(0,y.EM)("appkit-modal")],ey)}}]);