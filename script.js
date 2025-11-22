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
});