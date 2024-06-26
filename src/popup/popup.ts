import { getPreferences } from "../common/helpers.js";

chrome.tabs.query(
  {
    currentWindow: true,
    active: true,
    url: "*://*.youtube.com/*",
  },
  (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab) return;

    console.log(
      `Popup: Active YT tab found, requesting channel and category information`
    );

    const hasChannelInfo =
      activeTab.url.includes("@") || activeTab.url.includes("/watch?v=");

    if (!hasChannelInfo) return;

    console.log(
      `Popup: YT Page has channel information, applying styles to popup`
    );
    document.body.style.height = "510px";
    document
      .querySelectorAll(".dropdown-popup, .channel-dropdown-popup")
      .forEach((el: HTMLElement) => {
        el.removeAttribute("style");
      });

    // message to get channel information
    chrome.tabs.sendMessage(
      activeTab.id,
      {
        type: "MSG_POPUP_TAB_GET_CHANNEL",
      },
      async (response) => {
        if (response) {
          const { channelId, channelName } = response;
          console.log(`Popup: Received channel response from content script`);
          console.log(
            `Popup: channelId: ${channelId}, channelName: ${channelName}`
          );

          // get current selected category
          const preferences = await getPreferences();

          const placeholderChannelDropdown = document.querySelector(
            "channel-dropdown"
          ) as HTMLElement;
          const newChannelEl = document.createElement("channel-dropdown");
          // pass current selected category as an attribute
          newChannelEl.setAttribute(
            "channel-category-id",
            preferences.channelPreferences[channelName]
          );
          newChannelEl.setAttribute("channel-name", channelName);
          newChannelEl.setAttribute("channel-id", channelId);
          if (!(channelId && channelName))
            newChannelEl.setAttribute("disabled", "true");
          placeholderChannelDropdown.replaceWith(newChannelEl);
        }
      }
    );

    // on document load, grab the current video category
    // then host its dropdown element into the html document
    chrome.tabs.sendMessage(
      activeTab.id,
      { type: "MSG_POPUP_TAB_GET_CATEGORY" },
      (response) => {
        if (response) {
          console.log(`Popup: Received category response from content script`);

          const categoryId = response.categoryId;
          console.log(`Popup: categoryId: ${categoryId}`);

          const placeholderCategoryEl = document.querySelector("category-el");
          const newCategoryEl = document.createElement("category-el");
          newCategoryEl.setAttribute("category-id", categoryId);
          if (!categoryId) newCategoryEl.setAttribute("disabled", "true");
          placeholderCategoryEl.replaceWith(newCategoryEl);
        }
      }
    );
  }
);
