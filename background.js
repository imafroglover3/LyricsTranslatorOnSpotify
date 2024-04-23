const TranslateSonglyrics = "translate-song-lyrics";

const ResetSonglyrics = "reset-song-lyrics";

const SongLyricsClass = "esRByMgBY3TiENAsbDHA";

const LyricsLoaded = "lyrics-loaded";

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === TranslateSonglyrics) {
    const tabs = await chrome.tabs.query({ active: true });
    const tabId = tabs[0].id;
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        function: async (targetLanguage, lyricsColor) => {
          await translateSongLyrics(targetLanguage, lyricsColor);
        },
        args: [request.targetLanguage, request.lyricsColor],
      },
      () => {
        sendResponse();
      }
    );

    return true;
  } else if (request.action === ResetSonglyrics) {
    const tabs = await chrome.tabs.query({ active: true });
    const tabId = tabs[0].id;
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        function: async () => await resetSongLyrics(),
      },
      () => {
        sendResponse();
      }
    );

    return true;
  }
});