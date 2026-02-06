import './style.css';
// import typescriptLogo from './typescript.svg';
import { lightCSS } from '../lib/main';
lightCSS({ prefix: 'lc-app', useInnerHTML: true });
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="lc-app">
    <div class="text-[16px] text-[0xff0] pl-[10px] h-[50px] z-auto">Text test...</div>
    <div class="shadow-[20px]-[#fff5] hover:shadow-[30px]-[#fff7] p-[30px] round-[12px] z-1">Shadow test...</div>
    <div class="overflow-auto">overflow-auto</div>
    <div class="disp-[flex] gap-[12px] z-[10] overflow-x-scroll">
        <div>1</div>
        <div>2</div>
    </div>
    
    <div class="w-[300px] h-[300px] bg-size-[100px_100px] bg-[url(https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=1000&q=80)] mt-[12px]">
        Background
    </div>
</div> 
`;
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div class="lc-app">
//   <div class="full-w flex-[2]">
//   <div class="position-absolute left-[0px] top-[0] w-[100px] hover:text-[red] active:text-[green]">123123</div>
//     <div class="size-[64px]">
//       <img src="${typescriptLogo}" alt="TypeScript logo" />
//     </div>
//     <h1 class="text-left text-[#f00] ">Vite + TypeScript</h1>
//     <div class="card text-[16px] text-[white]">
//       <button id="counter" type="button">Hello</button>
//     </div>
//     <p class="read-the-docs text-[green]">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//
//     <svg class="size-[20px] text-[#016fff]" xmlns="http://www.w3.org/2000/svg" width="6" height="10"><path fill-rule="evenodd" d="M.615 1.385A.54.54 0 0 1 .496.792a.544.544 0 0 1 .89-.177L4.87 4.1q.373.373.373.9 0 .528-.373.9L1.386 9.386a.54.54 0 0 1-.492.149.543.543 0 0 1-.398-.743.5.5 0 0 1 .119-.177L4.1 5.129A.18.18 0 0 0 4.153 5a.18.18 0 0 0-.053-.128z" clip-rule="evenodd"/></svg>
//   </div>
//   </div>
// `;

// setTimeout(() => {
//   const target = document.body.querySelector('.read-the-docs');
//   if (target instanceof HTMLElement) {
//     target.classList.add('text-[24px]');
//   }
// }, 1000);
// setTimeout(() => {
//   const target = document.body.querySelector('.read-the-docs');
//   if (target instanceof HTMLElement) {
//     target.classList.add('text-[16px]');
//     target.classList.add('text-[red]');
//     target.classList.add('text-right');
//   }
// }, 1500);
// setTimeout(() => {
//   const dom = document.createElement('div');
//   dom.className = 'lc-app size-24 text-[32px]';
//   dom.innerHTML = '<div class="text-[skyblue] text-[40px]">aaaaaaa</div><div class="text-[orange]">Hello</div>';
//   document.body.appendChild(dom);
// }, 2000);
