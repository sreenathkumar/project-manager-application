import React from 'react'

export default function ColorList() {
   return (
      <><label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select a color</label>

         <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
               <div class="flex items-center pl-3">
                  <input id="horizontal-list-radio-slate" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="horizontal-list-radio-slate" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-slate-800' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
               </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
               <div class="flex items-center pl-3">
                  <input id="horizontal-list-radio-pink" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="horizontal-list-radio-pink" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-pink-500' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
               </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
               <div class="flex items-center pl-3">
                  <input id=" hidden horizontal-list-radio-purple" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="horizontal-list-radio-purple" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-purple-500' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
               </div>
            </li>
            <li class="w-full dark:border-gray-600">
               <div class="flex items-center pl-3">
                  <input id="horizontal-list-radio-rose" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="horizontal-list-radio-rose" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-rose-500' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
               </div>
            </li>
            <li class="w-full dark:border-gray-600">
               <div class="flex items-center pl-3">
                  <input id="horizontal-list-radio-blue" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="horizontal-list-radio-blue" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-blue-500' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
               </div>
            </li>
            <li class="w-full dark:border-gray-600">
               <div class="flex items-center pl-3">
                  <input id="horizontal-list-radio-green" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="horizontal-list-radio-green" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-green-500' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
               </div>
            </li>
         </ul>

      </>
   )
}
