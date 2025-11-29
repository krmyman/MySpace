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
                collapse(hobbyContent, hobbyToggle, "興趣簡介");
            }
            expand(aboutContent, aboutToggle, "個人簡介");
        }
    });

    // 點擊事件：興趣
    hobbyToggle.addEventListener("click", () => {
        const open = hobbyContent.classList.contains("expanded");

        if (open) {
            collapse(hobbyContent, hobbyToggle, "興趣簡介");
        } else {
            // 手風琴：展開 hobby → 自動收 about
            if (aboutContent.classList.contains("expanded")) {
                collapse(aboutContent, aboutToggle, "個人簡介");
            }
            expand(hobbyContent, hobbyToggle, "興趣簡介");
        }
    });
    // ===== Lightbox 控制 (穩定版) =====
    (function () {
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        if (!lightbox || !lightboxImg) return;

        // 開啟 lightbox：window.openLightbox 可以被 inline onclick 呼叫
        window.openLightbox = function (imgUrl) {
            // 設定圖片
            lightboxImg.src = imgUrl;
            // 加上 active
            lightbox.classList.add("active");
            // 加上 body class 阻止底層互動/hover（選擇性）
            document.body.classList.add("lightbox-open");
        };

        // 關閉 lightbox（點遮罩或按 Esc）
        function closeLB() {
            lightbox.classList.remove("active");
            lightboxImg.src = "";
            document.body.classList.remove("lightbox-open");
        }

        lightbox.addEventListener("click", function (e) {
            // 只有在點到遮罩本身時關閉（避免點到圖片時關閉）
            if (e.target === lightbox) closeLB();
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeLB();
        });
    })();
});