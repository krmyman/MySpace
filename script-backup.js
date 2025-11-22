//等整個HTML結構載入完成，才開始執行
document.addEventListener("DOMContentLoaded", () => {
    //抓取元素
    const toggle = document.getElementById("about-toggle");
    const content = document.getElementById("about-content");
    //
    if(!toggle || !content)return;

    //初始確保 collapsed 狀態一致
    content.classList.remove("expended");
    content.style.maxHeight = "0px";
    content.setAttribute("aria-hidden", "true");

    toggle.addEventListener("click",() => {
        const isExpanded = content.classList.contains("expanded");
        if(isExpanded){
            //收回
            content.style.maxHeight = content.scrollHeight + "px";//一步設定當前高度，接著強制回0（觸發動畫）
            //強制回流，確保transition起效（少見但可靠）
            void content.offsetHeight;
            content.style.maxHeight = "0px";
            content.classList.remove("expended");
            content.setAttribute("aria-hidden","true");
            toggle.textContent = "個人簡介 ▼";
        }
        else{
            //展開
            content.classList.add("expended");
            //先把maxHight設定內容高度以展開（允許任意高度）
            content.style.maxHeight = content.scrollHeight + "px";
            content.setAttribute("aria-hidden","flase");
            toggle.textContent = "個人簡介 ▲";
            //當transition 結束後 可清除 inline maxHeight(非必要，但可以讓高度自動調整)
            const onTransitionEnd = (e) => {
                if(e.propertyName === "max-height"){
                    //清理以便內容高度變動(例如載入照片)也會自然顯示
                    content.style.maxHeight = "none";
                    content.removeEventListener("transitionend",onTransitionEnd);
                }
            };
            content.addEventListener("transitionend",onTransitionEnd);
        }
    });
});