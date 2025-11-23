document.addEventListener("DOMContentLoaded", () => {
    // 個人簡介
    const aboutToggle = document.getElementById("about-toggle");
    const aboutContent = document.getElementById("about-content");

    // 興趣
    const hobbyToggle = document.getElementById("hobby-toggle");
    const hobbyContent = document.getElementById("hobby-content");

    // 統一初始化
    function initSection(content) {
        content.style.maxHeight = "0px";
        content.classList.remove("expanded");
    }
    initSection(aboutContent);
    initSection(hobbyContent);

    // 收起功能（提供給兩個區塊互相使用）
    function collapse(content, toggle, title) {
        content.style.maxHeight = content.scrollHeight + "px";
        void content.offsetHeight; // 強制觸發 reflow
        content.style.maxHeight = "0px";
        content.classList.remove("expanded");
        toggle.textContent = title + " ▼";
    }

    // 展開功能
    function expand(content, toggle, title) {
        content.classList.add("expanded");
        content.style.maxHeight = content.scrollHeight + "px";
        toggle.textContent = title + " ▲";

        const onEnd = (e) => {
            if (e.propertyName === "max-height") {
                content.style.maxHeight = "none";
                content.removeEventListener("transitionend", onEnd);
            }
        };
        content.addEventListener("transitionend", onEnd);
    }

    // 點擊事件：個人簡介
    aboutToggle.addEventListener("click", () => {
        const open = aboutContent.classList.contains("expanded");

        if (open) {
            collapse(aboutContent, aboutToggle, "個人簡介");
        } else {
            // 手風琴：展開 about → 自動收 hobby
            if (hobbyContent.classList.contains("expanded")) {
                collapse(hobbyContent, hobbyToggle, "興趣");
            }
            expand(aboutContent, aboutToggle, "個人簡介");
        }
    });

    // 點擊事件：興趣
    hobbyToggle.addEventListener("click", () => {
        const open = hobbyContent.classList.contains("expanded");

        if (open) {
            collapse(hobbyContent, hobbyToggle, "興趣");
        } else {
            // 手風琴：展開 hobby → 自動收 about
            if (aboutContent.classList.contains("expanded")) {
                collapse(aboutContent, aboutToggle, "個人簡介");
            }
            expand(hobbyContent, hobbyToggle, "興趣");
        }
    });
});