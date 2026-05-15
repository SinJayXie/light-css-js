import './style.css';
import { lightCSS } from '../src';

lightCSS({ prefix: 'lc-app', useInnerHTML: true });

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="p-8">
    <div class="text-center mb-12">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      </div>
      <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">LightCSS</h1>
      <p class="text-gray-500 text-lg">Lightweight CSS Utility Library in UnoCSS Style</p>
      <div class="flex gap-3 justify-center mt-6">
        <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">v1.0.16</span>
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Zero Deps</span>
        <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">TypeScript</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-800 mb-2">Lightning Fast</h3>
        <p class="text-gray-500 text-sm">On-demand CSS generation with zero runtime overhead</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div class="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-800 mb-2">Tailwind Compatible</h3>
        <p class="text-gray-500 text-sm">Familiar utility classes inspired by Tailwind CSS</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-800 mb-2">Fully Customizable</h3>
        <p class="text-gray-500 text-sm">Extensible rule system for your own utilities</p>
      </div>
    </div>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center mr-3 text-indigo-600 text-sm font-bold">1</span>
        Background Colors
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p class="text-gray-500 mb-4 text-sm">Tailwind-inspired background color utilities with 22 color palettes and 11 shades each.</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-red-50 p-3 rounded-lg text-center text-xs font-medium">red-50</div>
          <div class="bg-red-100 p-3 rounded-lg text-center text-xs font-medium">red-100</div>
          <div class="bg-red-200 p-3 rounded-lg text-center text-xs font-medium">red-200</div>
          <div class="bg-red-300 p-3 rounded-lg text-center text-xs font-medium">red-300</div>
          <div class="bg-red-400 p-3 rounded-lg text-center text-xs font-medium text-white">red-400</div>
          <div class="bg-red-500 p-3 rounded-lg text-center text-xs font-medium text-white">red-500</div>
          <div class="bg-red-600 p-3 rounded-lg text-center text-xs font-medium text-white">red-600</div>
          <div class="bg-red-700 p-3 rounded-lg text-center text-xs font-medium text-white">red-700</div>
          <div class="bg-red-800 p-3 rounded-lg text-center text-xs font-medium text-white">red-800</div>
          <div class="bg-red-900 p-3 rounded-lg text-center text-xs font-medium text-white">red-900</div>
          <div class="bg-red-950 p-3 rounded-lg text-center text-xs font-medium text-white">red-950</div>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <div class="bg-blue-50 p-3 rounded-lg text-center text-xs font-medium">blue-50</div>
          <div class="bg-blue-100 p-3 rounded-lg text-center text-xs font-medium">blue-100</div>
          <div class="bg-blue-200 p-3 rounded-lg text-center text-xs font-medium">blue-200</div>
          <div class="bg-blue-300 p-3 rounded-lg text-center text-xs font-medium">blue-300</div>
          <div class="bg-blue-400 p-3 rounded-lg text-center text-xs font-medium text-white">blue-400</div>
          <div class="bg-blue-500 p-3 rounded-lg text-center text-xs font-medium text-white">blue-500</div>
          <div class="bg-blue-600 p-3 rounded-lg text-center text-xs font-medium text-white">blue-600</div>
          <div class="bg-blue-700 p-3 rounded-lg text-center text-xs font-medium text-white">blue-700</div>
          <div class="bg-blue-800 p-3 rounded-lg text-center text-xs font-medium text-white">blue-800</div>
          <div class="bg-blue-900 p-3 rounded-lg text-center text-xs font-medium text-white">blue-900</div>
          <div class="bg-blue-950 p-3 rounded-lg text-center text-xs font-medium text-white">blue-950</div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3 text-green-600 text-sm font-bold">2</span>
        Spacing
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p class="text-gray-500 mb-4 text-sm">Control padding and margin with intuitive utility classes.</p>
        <div class="grid grid-cols-4 gap-2 mb-4">
          <div class="bg-gray-100 p-1 text-xs text-center rounded">p-1</div>
          <div class="bg-gray-100 p-2 text-xs text-center rounded">p-2</div>
          <div class="bg-gray-100 p-3 text-xs text-center rounded">p-3</div>
          <div class="bg-gray-100 p-4 text-xs text-center rounded">p-4</div>
        </div>
        <div class="flex gap-2 mb-4">
          <div class="bg-indigo-100 px-2 py-1 text-xs rounded">px-2 py-1</div>
          <div class="bg-indigo-200 px-4 py-2 text-xs rounded">px-4 py-2</div>
          <div class="bg-indigo-300 px-6 py-3 text-xs rounded">px-6 py-3</div>
          <div class="bg-indigo-400 px-8 py-4 text-xs rounded text-white">px-8 py-4</div>
        </div>
        <div class="flex gap-2">
          <div class="bg-rose-100 pt-4 text-xs rounded">pt-4</div>
          <div class="bg-rose-100 pr-4 text-xs rounded">pr-4</div>
          <div class="bg-rose-100 pb-4 text-xs rounded">pb-4</div>
          <div class="bg-rose-100 pl-4 text-xs rounded">pl-4</div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center mr-3 text-yellow-600 text-sm font-bold">3</span>
        Sizing
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p class="text-gray-500 mb-4 text-sm">Flexible width and height utilities.</p>
        <div class="flex gap-4 items-center mb-4">
          <div class="bg-gradient-to-r from-cyan-400 to-blue-500 w-8 h-8 rounded flex items-center justify-center text-xs text-white font-bold">8</div>
          <div class="bg-gradient-to-r from-cyan-400 to-blue-500 w-12 h-12 rounded flex items-center justify-center text-xs text-white font-bold">12</div>
          <div class="bg-gradient-to-r from-cyan-400 to-blue-500 w-16 h-16 rounded flex items-center justify-center text-xs text-white font-bold">16</div>
          <div class="bg-gradient-to-r from-cyan-400 to-blue-500 w-20 h-20 rounded flex items-center justify-center text-sm text-white font-bold">20</div>
          <div class="bg-gradient-to-r from-cyan-400 to-blue-500 w-24 h-24 rounded flex items-center justify-center text-base text-white font-bold">24</div>
        </div>
        <div class="flex gap-2 items-end">
          <div class="bg-orange-200 h-8 w-12 text-xs flex items-center justify-center rounded">h-8</div>
          <div class="bg-orange-300 h-12 w-12 text-xs flex items-center justify-center rounded">h-12</div>
          <div class="bg-orange-400 h-16 w-12 text-xs flex items-center justify-center rounded text-white">h-16</div>
          <div class="bg-orange-500 h-20 w-12 text-xs flex items-center justify-center rounded text-white">h-20</div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center mr-3 text-pink-600 text-sm font-bold">4</span>
        Border
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex gap-4 flex-wrap mb-4">
          <div class="b-2 b-gray-300 p-4 rounded-lg text-xs text-center">b-1</div>
          <div class="b-2 b-gray-400 p-4 rounded-lg text-xs text-center">b-2</div>
          <div class="b-2 b-gray-500 p-4 rounded-lg text-xs text-center">b-4</div>
          <div class="b-2 b-red-500 p-4 rounded-lg text-xs text-center text-red-500">b-red</div>
          <div class="b-2 b-blue-500 p-4 rounded-lg text-xs text-center text-blue-500">b-blue</div>
          <div class="b-2 b-green-500 p-4 rounded-lg text-xs text-center text-green-500">b-green</div>
        </div>
        <div class="flex gap-4 flex-wrap">
          <div class="b-2 b-solid b-gray-500 p-3 rounded text-xs">solid</div>
          <div class="b-2 b-dashed b-gray-500 p-3 rounded text-xs">dashed</div>
          <div class="b-2 b-dotted b-gray-500 p-3 rounded text-xs">dotted</div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3 text-purple-600 text-sm font-bold">5</span>
        Border Radius
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex gap-3 flex-wrap mb-4">
          <div class="bg-gray-200 p-3 text-xs rounded-none">none</div>
          <div class="bg-gray-200 p-3 text-xs rounded">rounded</div>
          <div class="bg-gray-200 p-3 text-xs rounded-sm">sm</div>
          <div class="bg-gray-200 p-3 text-xs rounded-md">md</div>
          <div class="bg-gray-200 p-3 text-xs rounded-lg">lg</div>
          <div class="bg-gray-200 p-3 text-xs rounded-xl">xl</div>
          <div class="bg-gray-200 p-3 text-xs rounded-2xl">2xl</div>
          <div class="bg-gradient-to-r from-pink-500 to-rose-500 p-3 text-xs rounded-full text-white">full</div>
        </div>
        <div class="flex gap-2">
          <div class="bg-orange-200 p-4 text-xs rounded-tl-xl">tl-xl</div>
          <div class="bg-orange-300 p-4 text-xs rounded-tr-xl">tr-xl</div>
          <div class="bg-orange-400 p-4 text-xs rounded-bl-xl text-white">bl-xl</div>
          <div class="bg-orange-500 p-4 text-xs rounded-br-xl text-white">br-xl</div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3 text-gray-600 text-sm font-bold">6</span>
        Shadow
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex gap-6 flex-wrap">
          <div class="bg-white p-4 rounded-lg shadow-sm text-xs text-center">shadow-sm</div>
          <div class="bg-white p-4 rounded-lg shadow-md text-xs text-center">shadow-md</div>
          <div class="bg-white p-4 rounded-lg shadow-lg text-xs text-center">shadow-lg</div>
          <div class="bg-white p-4 rounded-lg shadow-xl text-xs text-center">shadow-xl</div>
          <div class="bg-white p-4 rounded-lg shadow-2xl text-xs text-center">shadow-2xl</div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center mr-3 text-cyan-600 text-sm font-bold">7</span>
        Flexbox
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-4">
        <p class="text-gray-500 mb-3 text-sm">flex-row</p>
        <div class="flex bg-gray-100 p-3 gap-2 rounded-lg">
          <div class="bg-blue-200 p-2 rounded text-xs">Item 1</div>
          <div class="bg-blue-300 p-2 rounded text-xs">Item 2</div>
          <div class="bg-blue-400 p-2 rounded text-xs text-white">Item 3</div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-4">
        <p class="text-gray-500 mb-3 text-sm">flex-col</p>
        <div class="flex flex-col bg-gray-100 p-3 gap-2 rounded-lg">
          <div class="bg-green-200 p-2 rounded text-xs">Item 1</div>
          <div class="bg-green-300 p-2 rounded text-xs">Item 2</div>
          <div class="bg-green-400 p-2 rounded text-xs text-white">Item 3</div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p class="text-gray-500 mb-3 text-sm">justify-between + items-center</p>
        <div class="flex justify-between items-center bg-gray-100 p-3 rounded-lg h-16">
          <div class="bg-amber-200 p-2 rounded text-xs">Left</div>
          <div class="bg-amber-300 p-2 rounded text-xs">Center</div>
          <div class="bg-amber-400 p-2 rounded text-xs text-white">Right</div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center mr-3 text-teal-600 text-sm font-bold">8</span>
        Grid
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-4">
        <p class="text-gray-500 mb-3 text-sm">grid-cols-3</p>
        <div class="grid grid-cols-3 gap-2 bg-gray-100 p-3 rounded-lg">
          <div class="bg-teal-200 p-2 rounded text-xs text-center">1</div>
          <div class="bg-teal-300 p-2 rounded text-xs text-center">2</div>
          <div class="bg-teal-400 p-2 rounded text-xs text-center text-white">3</div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p class="text-gray-500 mb-3 text-sm">col-span</p>
        <div class="grid grid-cols-4 gap-2 bg-gray-100 p-3 rounded-lg">
          <div class="bg-rose-200 p-2 rounded text-xs text-center">1</div>
          <div class="col-span-2 bg-rose-300 p-2 rounded text-xs text-center">col-2</div>
          <div class="bg-rose-400 p-2 rounded text-xs text-center text-white">4</div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center mr-3 text-indigo-600 text-sm font-bold">9</span>
        Typography
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-4">
        <p class="text-gray-500 mb-3 text-sm">Font Size</p>
        <div class="space-y-2">
          <div class="text-xs">text-xs - Extra small</div>
          <div class="text-sm">text-sm - Small</div>
          <div class="text-base">text-base - Base</div>
          <div class="text-lg">text-lg - Large</div>
          <div class="text-xl">text-xl - Extra large</div>
          <div class="text-2xl">text-2xl - 2X large</div>
          <div class="text-3xl">text-3xl - 3X large</div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-4">
        <p class="text-gray-500 mb-3 text-sm">Font Weight</p>
        <div class="flex flex-wrap gap-4">
          <span class="font-thin text-lg">thin</span>
          <span class="font-light text-lg">light</span>
          <span class="font-normal text-lg">normal</span>
          <span class="font-medium text-lg">medium</span>
          <span class="font-semibold text-lg">semibold</span>
          <span class="font-bold text-lg">bold</span>
          <span class="font-black text-lg">black</span>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p class="text-gray-500 mb-3 text-sm">Text Style</p>
        <div class="flex flex-wrap gap-4 mb-3">
          <span class="italic">italic</span>
          <span class="oblique">oblique</span>
        </div>
        <div class="flex flex-wrap gap-4 mb-3">
          <span class="underline">underline</span>
          <span class="overline">overline</span>
          <span class="line-through">line-through</span>
        </div>
        <div class="flex flex-wrap gap-4">
          <span class="uppercase">uppercase</span>
          <span class="lowercase">LOWERCASE</span>
          <span class="capitalize">capitalize</span>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center mr-3 text-orange-600 text-sm font-bold">10</span>
        Position
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="relative h-28 bg-gray-100 rounded-lg mb-4">
          <div class="absolute top-2 left-2 bg-red-400 px-3 py-1 rounded text-xs text-white">top-left</div>
          <div class="absolute top-2 right-2 bg-red-400 px-3 py-1 rounded text-xs text-white">top-right</div>
          <div class="absolute bottom-2 left-2 bg-red-400 px-3 py-1 rounded text-xs text-white">btm-left</div>
          <div class="absolute bottom-2 right-2 bg-red-400 px-3 py-1 rounded text-xs text-white">btm-right</div>
        </div>
        <div class="flex gap-3">
          <div class="relative bg-blue-100 p-3 rounded text-xs">relative</div>
          <div class="absolute bg-blue-200 p-3 rounded text-xs" style="position: relative;">absolute</div>
          <div class="bg-blue-300 p-3 rounded text-xs">static</div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mr-3 text-emerald-600 text-sm font-bold">11</span>
        Effects
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex gap-6 items-center">
          <div class="bg-gradient-to-r from-violet-400 to-fuchsia-500 p-4 rounded-lg text-white text-xs cursor-pointer transition-all hover:scale-110">hover:scale</div>
          <div class="bg-gradient-to-r from-blue-400 to-cyan-400 p-4 rounded-lg text-white text-xs cursor-pointer transition-colors hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500">hover:bg</div>
          <div class="bg-gray-300 p-4 rounded-lg text-xs opacity-100">opacity-100</div>
          <div class="bg-gray-300 p-4 rounded-lg text-xs opacity-75">opacity-75</div>
          <div class="bg-gray-300 p-4 rounded-lg text-xs opacity-50">opacity-50</div>
          <div class="bg-gray-300 p-4 rounded-lg text-xs opacity-25">opacity-25</div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center mr-3 text-rose-600 text-sm font-bold">12</span>
        Custom Values
      </h2>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p class="text-gray-500 mb-4 text-sm">Support arbitrary values with bracket notation.</p>
        <div class="text-[24px] text-[#ff6b6b] mb-3">text-[24px] text-[#ff6b6b]</div>
        <div class="w-[200px] h-[80px] bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold mb-3">w-[200px] h-[80px]</div>
        <div class="pl-[30px] pr-[40px] pt-[20px] pb-[20px] bg-slate-100 rounded-lg text-sm">pl-[30px] pr-[40px] pt-[20px] pb-[20px]</div>
      </div>
    </section>

    <div class="text-center pt-8 pb-8 border-t border-gray-200">
      <p class="text-gray-400 text-sm">Built with LightCSS - The lightweight CSS utility library</p>
      <p class="text-gray-300 text-xs mt-2">© 2024 LightCSS. MIT License.</p>
    </div>
  </div>
`;
