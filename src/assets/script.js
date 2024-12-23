window.onload = () => {
  console.log("loaded");
  
  const limit = -3700
  const fps = 100;
  const body = document.body || document.querySelectorAll("body")
  let timer, frame = 0;
  const i = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (frame <= limit) {
        clearInterval(timer);
        return
      } else frame -= 100;

      body.style.backgroundPositionX = frame + "px";
    }, fps)
  }
  const d = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (frame >= 0) {
        clearInterval(timer);
        return
      } else frame += 100;

      body.style.backgroundPositionX = frame + "px";
    }, fps)
  }

  body.addEventListener("mouseenter", i);
  body.addEventListener("mouseleave", d);

}