import { Component, Host, h, Prop } from '@stencil/core';
let componentElement:ShadowRoot;
let buttonClose:HTMLElement;
let acceptButton:HTMLElement;
let banner:HTMLDivElement;

@Component({
  tag: 'cookie-banner',
  styleUrl: 'cookie-banner.css',
  shadow: true,
})
export class CookieBanner {

  @Prop() heading:string;
  @Prop() bannertext:string;
  @Prop() buttontext:string;
  @Prop() linkguidelines?:string;

  linkGuidelines() {
    const link = this.linkguidelines;
    const url = "https://www.airbnb.de/help/article/2855/datenschutzerkl%C3%A4rung" + link;
    window.open(url);
  }

  render() {
    return (
      <Host>
        <div class="container">
          <div class="content">
            <button id="closeButton" class="buttons">&#10005;</button>
            <p class="heading">{this.heading && <p>{this.heading}</p>}</p>
            <p>{this.bannertext && <p>{this.bannertext}</p>}</p>
            <p onClick={() => this.linkGuidelines()}>{this.linkguidelines && <p class="link">{this.linkguidelines}</p>}</p>
            <button id="acceptButton" class="buttons">{this.buttontext && <p>{this.buttontext}</p>}</button>
          </div>
        </div>
        <slot></slot>
      </Host>
    );
  }
  componentDidLoad() {
    defineObjectReferences();
  }
}

function defineObjectReferences() {
  componentElement =  document.querySelector("cookie-banner").shadowRoot;
  buttonClose = componentElement.querySelector("#closeButton");
  acceptButton = componentElement.querySelector("#acceptButton");
  banner = componentElement.querySelector(".container");

  buttonClose.addEventListener("click", removeCookieBanner);
  acceptButton.addEventListener("click", removeCookieBanner);
}

function removeCookieBanner(){
 banner.style.display = "none";
}