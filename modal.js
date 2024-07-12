    const modal = (content, option) => {

        const optionDefault = {
            headerLabel: "",
            oLabel: "확인",
            xLabel: "취소",
            showOButton: true,
            showXButton: true,
            showHeader: true,
            backDropCloseEnable: true,
            tansparentEnable: true,
            insideDragEnable: true,
            oEvent: () => {}
        }
        option = {
            ...optionDefault,
            ...option
        }

        const id = `customId_No${Math.floor(Math.random() * 10e5)}`
        document.body.insertAdjacentHTML("afterbegin", `
        <dialog id="${id}">

            <style>
                #${id} {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
        
                    border: 0;
                    max-width: 100%;
                    max-height: 100%;
                    background: none;
                }
                #${id}::backdrop {
                    background: #00000050;
                }
                #${id} [data-id="modalWrap"] {
                    width: 400px;
                    height: 250px;
                    background: #fff;
                    border-radius: 10px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: translate .3s ease-out;
                    position: absolute;
                }
                #${id} [data-id="modalWrap"].fade {
                    translate: 0 -100vh;
                }
                #${id} [data-id="modalWrap"].grab {
                    cursor: grabbing;
                }
                #${id} [data-id="modalWrap"].grab.tansparent {
                    opacity: .7;
                }
                #${id} [data-id="header"] {
                    height: 30px;
                    padding: 5px 10px;
                    background: #ddd;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    flex-shrink: 0;
                    color: #555;
                }
                #${id} [data-id="header"] [data-id="labelArea"] {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                }
                #${id} [data-id="body"] {
                    padding: 10px;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                #${id} [data-id="footer"] {
                    height: 50px;
                    padding: 10px;
                    border-top: 1px solid #eee;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    flex-shrink: 0;
                }
                #${id} button {
                    background: none;
                    border: 0;
                    cursor: pointer;
                }
                #${id} [data-id="footer"] button {
                    padding: 5px 20px;
                    border: 1px solid #eee;
                    border-radius: 5px;
                }
                #${id} [data-id="footer"] button[data-id="o"] {
                    background: #3fab3f;
                    color: #fff;
                }
                #${id} [data-id="footer"] button[data-id="x"] {
                    background: #fff;
                    color: #333;
                    border-color: #ccc;
                }
            </style>

            <div data-id="modalWrap" class="fade">
                ${option.showHeader ? `
                <div data-id="header">
                    <div data-id="labelArea">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 -960 960 960" fill="#555">
                            <path d="M666-440 440-666l226-226 226 226-226 226Zm-546-80v-320h320v320H120Zm400 400v-320h320v320H520Zm-400 0v-320h320v320H120Zm80-480h160v-160H200v160Zm467 48 113-113-113-113-113 113 113 113Zm-67 352h160v-160H600v160Zm-400 0h160v-160H200v160Zm160-400Zm194-65ZM360-360Zm240 0Z"/>
                        </svg>
                        <p>${option.headerLabel}</p>
                    </div>
                    <div data-id="buttonArea">
                        <button type="button" data-role="close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 -960 960 960" fill="#333">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                ` : ""}
                <div data-id="body">${content}</div>
                <div data-id="footer">
                    ${option.showOButton ? `<button type="button" data-id="x" data-role="close">${option.xLabel}</button>` : ""}
                    ${option.showXButton ? `<button type="button" data-id="o" autofocus>${option.oLabel}</button>` : ""}
                </div>
            </div>
        </dialog>
        `)

        const customWrap = document.querySelector("body")
        const modalCustom = customWrap.querySelector(`#${id}`)
        const modalWrap = modalCustom.querySelector(`[data-id="modalWrap"]`)
        const header = modalWrap.querySelector(`[data-id="header"]`)
        
        modalCustom.showModal()
        setTimeout(() => modalWrap.classList.remove("fade"))
        const close = () => {
            modalWrap.classList.add("fade")
            // modalCustom.close()
            setTimeout(() => modalCustom.remove(), 100)
        }
        if(option.backDropCloseEnable)
        modalCustom.addEventListener("click", event => event.target == modalCustom && close())
        modalCustom.querySelectorAll(`[data-role="close"]`).forEach(element => element.addEventListener("click", close))
        modalCustom.querySelector(`[data-id="o"]`).addEventListener("click", () => {
            option.oEvent()
            close()
        })

        const getNowLeft = () => parseInt(getComputedStyle(modalWrap).left)
        const getNowTop = () => parseInt(getComputedStyle(modalWrap).top)
        const getMaxLeft = () => modalCustom.getBoundingClientRect().width
        const getMaxTop = () => modalCustom.getBoundingClientRect().height
        const setXY = (x, y) => {
            const maxLeft = getMaxLeft()
            const maxTop = getMaxTop()
            const setX = () => modalWrap.style.left = x + "px"
            const setY = () => modalWrap.style.top = y + "px"
            if(option.insideDragEnable) {
                x > 0 && maxLeft > x + modalWrap.getBoundingClientRect().width && setX()
                y > 0 && maxTop > y + modalWrap.getBoundingClientRect().height && setY()
            } else {
                setX()
                setY()
            }
        }

        modalWrap.style.left = getComputedStyle(modalWrap).left
        modalWrap.style.top = getComputedStyle(modalWrap).top
        header.addEventListener("mousedown", e => {
            e.preventDefault()
            const nowLeft = getNowLeft()
            const nowTop = getNowTop()
            modalWrap.classList.add("grab")
            option.tansparentEnable && modalWrap.classList.add("tansparent")

            const mouseMoveEvent = event => setXY(nowLeft - (e.x - event.x), nowTop - (e.y - event.y))
            document.addEventListener("mousemove", mouseMoveEvent);

            document.addEventListener("mouseup", event => {
                modalWrap.classList.remove("grab")
                modalWrap.classList.remove("tansparent")
                document.removeEventListener("mousemove", mouseMoveEvent)
            })
        })

        // ESC 이벤트
        document.addEventListener("keydown", event => event.keyCode == 27 && close())
    }