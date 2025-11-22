document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("about-toggle");
    const content = document.getElementById("about-content");

    if (!toggle || !content) return;

    // 初始化
    content.classList.remove("expanded");
    content.style.maxHeight = "0px";
    content.setAttribute("aria-hidden", "true");

    toggle.addEventListener("click", () => {
        const isExpanded = content.classList.contains("expanded");

        if (isExpanded) {
            // 收起
            content.style.maxHeight = content.scrollHeight + "px";
            void content.offsetHeight; // 強制回流，啟動動畫
            content.style.maxHeight = "0px";
            content.classList.remove("expanded");
            content.setAttribute("aria-hidden", "true");
            toggle.textContent = "個人簡介 ▼";
        } else {
            // 展開
            content.classList.add("expanded");
            content.style.maxHeight = content.scrollHeight + "px";
            content.setAttribute("aria-hidden", "false");
            toggle.textContent = "個人簡介 ▲";

            const onTransitionEnd = (e) => {
                if (e.propertyName === "max-height") {
                    content.style.maxHeight = "none"; // 展開後允許內容自適應高度
                    content.removeEventListener("transitionend", onTransitionEnd);
                }
            };

            content.addEventListener("transitionend", onTransitionEnd);
        }
    });
    // === 興趣 toggle ===
    const hobbyToggle = document.getElementById("hobby-toggle");
    const hobbyContent = document.getElementById("hobby-content");

    if (hobbyToggle && hobbyContent) {
        hobbyContent.style.maxHeight = "0px";

        hobbyToggle.addEventListener("click", () => {
            const isOpen = hobbyContent.classList.contains("expanded");

            if (isOpen) {
                hobbyContent.style.maxHeight = hobbyContent.scrollHeight + "px";
                void hobbyContent.offsetHeight;
                hobbyContent.style.maxHeight = "0px";
                hobbyContent.classList.remove("expanded");
                hobbyToggle.textContent = "興趣 ▼";
            } else {
                hobbyContent.classList.add("expanded");
                hobbyContent.style.maxHeight = hobbyContent.scrollHeight + "px";
                hobbyToggle.textContent = "興趣 ▲";

                const onEnd = (e) => {
                    if (e.propertyName === "max-height") {
                        hobbyContent.style.maxHeight = "none";
                        hobbyContent.removeEventListener("transitionend", onEnd);
                    }
                };
                hobbyContent.addEventListener("transitionend", onEnd);
            }
        });
    }
});