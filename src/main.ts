import './style.css';
import typescriptLogo from './typescript.svg';
import { lightCSS } from '../lib/main';
lightCSS({ useInnerHTML: true });

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="full-w flex-[2]">
  <div class="position-absolute left-[0px] top-[0] w-[100px]">123123</div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo size-[60px]" alt="Vite logo" />
    </a>
    <div class="size-[64px]">
      <img src="${typescriptLogo}" alt="TypeScript logo" />
    </div>
    <h1 class="text-left text-[#f00] ">Vite + TypeScript</h1>
    <div class="card text-[16px] text-[white]">
      <button id="counter" type="button">Hello</button>
    </div>
    <p class="read-the-docs text-[green]">
      Click on the Vite and TypeScript logos to learn more
    </p>
    
    <svg class="size-[20px] text-[#016fff]" xmlns="http://www.w3.org/2000/svg" width="6" height="10"><path fill-rule="evenodd" d="M.615 1.385A.54.54 0 0 1 .496.792a.544.544 0 0 1 .89-.177L4.87 4.1q.373.373.373.9 0 .528-.373.9L1.386 9.386a.54.54 0 0 1-.492.149.543.543 0 0 1-.398-.743.5.5 0 0 1 .119-.177L4.1 5.129A.18.18 0 0 0 4.153 5a.18.18 0 0 0-.053-.128z" clip-rule="evenodd"/></svg>
  </div>
`;

setTimeout(() => {
  const target = document.body.querySelector('.read-the-docs');
  if (target instanceof HTMLElement) {
    target.classList.add('text-[24px]');
  }
}, 1000);
setTimeout(() => {
  const target = document.body.querySelector('.read-the-docs');
  if (target instanceof HTMLElement) {
    target.classList.add('text-[16px]');
    target.classList.add('text-[red]');
    target.classList.add('text-right');
  }
}, 1500);
setTimeout(() => {
  const dom = document.createElement('div');
  dom.className = 'size-24';
  dom.innerHTML = '<div class="text-[skyblue] text-[40px]">aaaaaaa</div><div class="text-[orange]">Hello</div>';
  document.body.appendChild(dom);
}, 2000);
