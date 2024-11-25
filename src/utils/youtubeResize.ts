import Youtube from "@tiptap/extension-youtube";

import ConerBottomRightIcon from "@/assets/editor-corner-bottom-right.svg";

export const YoutubeResize = Youtube.extend({
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      style: {
        default:
          "width: 100%; height: auto; cursor: pointer; padding: 0; aspect-ratio: 404 / 279; pointer-events: none;",
      },
      title: {
        default: null,
      },
      loading: {
        default: null,
      },
      srcset: {
        default: null,
      },
      sizes: {
        default: null,
      },
      crossorigin: {
        default: null,
      },
      usemap: {
        default: null,
      },
      ismap: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
      referrerpolicy: {
        default: null,
      },
      longdesc: {
        default: null,
      },
      decoding: {
        default: null,
      },
      class: {
        default: null,
      },
      id: {
        default: null,
      },
      name: {
        default: null,
      },
      draggable: {
        default: true,
      },
      tabindex: {
        default: null,
      },
      "aria-label": {
        default: null,
      },
      "aria-labelledby": {
        default: null,
      },
      "aria-describedby": {
        default: null,
      },
    };
  },
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const {
        view,
        options: { editable },
      } = editor;
      const { style } = node.attrs;

      const $container = document.createElement("div");
      const $iframe = document.createElement("iframe");

      if (!editable) {
        return {
          dom: $iframe,
        };
      }

      $container.style.display = "flex";
      $container.style.position = "relative";

      const dispatchNodeView = () => {
        if (typeof getPos !== "function") return;

        view.dispatch(view.state.tr.setNodeMarkup(getPos(), null, node.attrs));
      };

      const addIframeResizeElement = () => {
        const topContainer = document.createElement("div");
        topContainer.style.cssText = "width: 100%; height: 15px; position: absolute; top: 0; left: 0; z-index: 1;";

        const bottomContainer = document.createElement("div");
        bottomContainer.style.cssText = "width: 100%; height: 15px; position: absolute; bottom: 0; left: 0; z-index: 1";

        const iconStyle = "width: 30px; height: 30px; position: absolute; z-index: 2;";

        const conerBottomRightImg = document.createElement("img");
        conerBottomRightImg.src = ConerBottomRightIcon;
        conerBottomRightImg.style.cssText = iconStyle + "bottom: 0; right: 0; cursor: nwse-resize;";

        $container.appendChild(topContainer);
        $container.appendChild(bottomContainer);
        $container.appendChild(conerBottomRightImg);

        let isResizing = false;

        const resize = (e: MouseEvent) => {
          if (!isResizing) return;
          e.stopPropagation();

          const { clientX } = e;
          const { left } = $container.getBoundingClientRect();
          let newWidth = clientX - left;
          const editorWidth = view.dom.clientWidth;

          if (newWidth > editorWidth) {
            newWidth = editorWidth;
          }

          $container.style.width = `${newWidth}px`;
        };

        const stopResize = () => {
          isResizing = false;
          document.removeEventListener("mousemove", resize);
          document.removeEventListener("mouseup", stopResize);

          dispatchNodeView();
        };

        conerBottomRightImg.addEventListener("mousedown", () => {
          isResizing = true;
          document.addEventListener("mousemove", resize);
          document.addEventListener("mouseup", stopResize);
        });
      };

      console.log(style);
      $iframe.setAttribute("style", style);
      $container.appendChild($iframe);

      Object.entries(node.attrs).forEach(([key, value]) => {
        if (value === null) return;

        if (key === "src") {
          const findWatch = value.lastIndexOf("watch?v=");
          const findSlash = value.lastIndexOf("/");
          let youtubeParameter;

          if (findSlash === -1 && findWatch === -1) {
            return;
          }

          if (findWatch !== -1) {
            youtubeParameter = value.split("watch?v=");
          } else if (findSlash !== -1) {
            youtubeParameter = value.split("/");
          }

          if (youtubeParameter) {
            $iframe.setAttribute("src", `https://www.youtube.com/embed/${youtubeParameter.pop()}`);
            addIframeResizeElement();
          }
        } else {
          $iframe.setAttribute(key, value);
        }
      });

      return {
        dom: $container,
      };
    };
  },
});
