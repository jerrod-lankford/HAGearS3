/*
 *      Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */

/*global tau */
/*jshint unused: vars*/

(function(tau) {
    var page,
        elScroller,
        list,
        listHelper = [],
        i,
        len;
    if (tau.support.shape.circle) {
        document.addEventListener("pagebeforeshow", function(e) {
            page = e.target;
            elScroller = page.querySelector(".ui-scroller");
              /**
             * If elScroller existed, set 'tizen-circular-scrollbar' attribute
               */
            if (elScroller) {
                list = elScroller.querySelectorAll(".ui-listview");
                if (list) {
                    if (page.id !== "pageMarqueeList" && page.id !== "pageTestVirtualList" && page.id !== "pageAnimation") {
                        len = list.length;
                        for (i = 0; i < len; i++) {
                        	// TODO maybe break this up? This makes every list in the app a marquee snap list (which is fine for now)
                            listHelper[i] = tau.helper.SnapListMarqueeStyle.create(list[i],{
                				marqueeDelay: 500});

                        }
                    }
                }
            }
        });

        document.addEventListener("pagebeforehide", function(e) {
            len = listHelper.length;
            if (len) {
                for (i = 0; i < len; i++) {
                    listHelper[i].destroy();
                }
                listHelper = [];
            }
        });
    }
}(tau));