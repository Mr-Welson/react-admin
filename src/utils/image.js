import { tagAToDownload } from "./download";

/**
 * 下载网络图片
 *  @param imgUrl: 下载地址
 *  @param title: 下载标题
 */
export function downloadLocalImage(imgUrl, title) {
  urlToBase64({ imgUrl, imgQuality: 0.8 }, base64Url => {
    let path = URL.createObjectURL(base64ToBlob(base64Url));
    tagAToDownload({
      url: path,
      title
    });
    setTimeout(() => {
      URL.revokeObjectURL(path);
    }, 10000);
  });
}

/**
 * 图片地址转base64
 */
export function urlToBase64({ imgUrl, imgQuality = 1, width, height }, callback) {
  let img = document.createElement("img");
  // crossOrigin属性必须在src之前，否则会报错！！
  img.setAttribute("crossOrigin", "anonymous");
  img.src = imgUrl;
  img.onload = () => {
    width = width ? width : img.width;
    height = height ? height : img.height;
    const base64Url = drawImage({
      target: img,
      width,
      height,
      imgQuality
    });
    return callback && callback(base64Url);
  };
}

/**
 * dom绘图获取base64Url
 * @param {element} target: 绘图目标： video、img、canvas
 * @param {Number} width: 图片宽度
 * @param {Number} height: 图片高度
 * @param {string} imgType: 图片类型
 * @param {Number} imgQuality: 图片质量 0-1
 */
export function drawImage({ target, width, height, imgType = "image/jpeg", imgQuality = 1 }) {
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(target, 0, 0);
  const base64Url = canvas.toDataURL(imgType, imgQuality);
  return base64Url;
}

export function addWaterMark(canvas, waterMark) {
  const { text, font, color, shadowColor, shadowX, shadowY, shadowBlur, degree, width, height } = waterMark;
  //水印画布
  let repeatCanvas = document.createElement("canvas");
  let rcw = (repeatCanvas.width = width);
  let rch = (repeatCanvas.height = height);
  let rctx = repeatCanvas.getContext("2d");
  //设置文本大小和字体
  rctx.font = font;
  //设置文本的颜色和透明度
  rctx.fillStyle = color;
  //设置文本阴影的颜色和透明度
  rctx.shadowColor = shadowColor;
  //设置文本阴影位置（相对文本）
  rctx.shadowOffsetX = shadowX;
  rctx.shadowOffsetY = shadowY;
  //设置文本阴影模糊度
  rctx.shadowBlur = shadowBlur;
  //将文本设为居中对齐
  rctx.textAlign = "center";
  rctx.textBaseline = "middle";
  //以文本的中心为旋转点
  rctx.translate(rcw / 2, rch / 2);
  rctx.rotate((degree * Math.PI) / 180);
  rctx.translate(-rcw / 2, -rch / 2);
  //讲文本绘制在画布中心
  text.forEach((item, index) => {
    rctx.fillText(item, rcw / 2, rch / 2 + parseFloat(font) * index);
  });

  let ctx = canvas.getContext("2d");
  //平铺水印画布
  ctx.fillStyle = ctx.createPattern(repeatCanvas, "repeat");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * file文件转base64
 * @param {file} input-file
 * @param {function} callback
 */
export function fileToBase64(file) {
  return new Promise(resove => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resove(reader.result));
    reader.readAsDataURL(file);
  });
}
/**
 * 图片base64转换为blob
 * @param {string} base64Url
 */
export function base64ToBlob(base64Url) {
  let bytes = window.atob(base64Url.split(",")[1]); // 去掉url的头，并转换为byte
  //处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/png" });
}

export function loadImage(imgUrl, noAjax) {
  return new Promise((resolve, reject) => {
    if (noAjax) {
      let img = document.createElement("img");
      function resolveImg(e) {
        resolve(e.target);
      }
      img.setAttribute("crossOrigin", "Anonymous");
      img.setAttribute("src", imgUrl);
      img.addEventListener("load", resolveImg, false);
      img.addEventListener("error", reject, false);
    } else {
      const xhr = new XMLHttpRequest();
      xhr.open("get", imgUrl, true);
      xhr.responseType = "blob";
      xhr.addEventListener("load", () => {
        if (this.status === 200) {
          let blob = this.response;
          let oFileReader = new FileReader();
          oFileReader.onloadend = e => {
            let image = new Image();
            image.src = e.target.result;
            resolve(image);
          };
          oFileReader.readAsDataURL(blob);
        }
      });
      xhr.addEventListener("error", reject, false);
      xhr.send();
    }
  });
}

function _getCaptureRect(rect, type) {
  let rectArea = rect.split(",");
  if (rectArea.length !== 4) {
    throw Error('区域有误 实例：string = "x,y,w,h"! ');
  }
  let x, y, w, h;
  switch (type) {
    case "body":
      x = rectArea[0] - rectArea[2] * 0.2;
      y = rectArea[1] - rectArea[3] * 0.2;
      w = rectArea[2] * 1.4;
      h = rectArea[3] * 1.4;
      break;
    case "vehicle":
      x = rectArea[0];
      y = rectArea[1];
      w = rectArea[2];
      h = rectArea[3];
      break;
    default:
      // face
      x = rectArea[0] - rectArea[2] * 0.8;
      y = rectArea[1] - rectArea[3] * 1.5;
      w = rectArea[2] * 2.6;
      h = rectArea[3] * 3.2;
      break;
  }
  return [x, y, w, h];
}

/**
 *
 * @param {string} url  // 图片地址
 * @param {string} rect  // 框选区域
 * @param {string} type // 框类型
 */
export function getRectImage(url, rect, type) {
  let img = document.createElement("img");
  // crossOrigin属性必须在src之前，否则会报错！！
  img.setAttribute("crossOrigin", "anonymous");
  img.src = url;
  let width, height;
  return new Promise((resolve, reject) => {
    img.onload = () => {
      width = img.width;
      height = img.height;
      const rects = _getCaptureRect(rect, type);
      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      let context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, width, height);
      let dataImg = context.getImageData(...rects);
      context.clearRect(0, 0, width, height);
      let canvas2 = document.createElement("canvas");
      let context2 = canvas2.getContext("2d");
      canvas2.width = rects[2];
      canvas2.height = rects[3];
      context2.putImageData(dataImg, 0, 0, 0, 0, rects[2], rects[3]);
      let imgURLBase64 = canvas2.toDataURL();
      resolve(imgURLBase64);
    };
    img.onerror = e => {
      reject(e);
    };
  });
}

export function replaceTypeForBase64(base64) {
  if (/^data:image/.test(base64)) {
    base64 = base64.split(",")[1];
  }
  return base64;
}
