var fadings = $(".fadein");
$(window).scroll(function() {
  var vpheight = document.documentElement.clientHeight;
  fadings.each(function() {
    var r = this.getBoundingClientRect();
    var thisHeight = $(this).height();
    if (thisHeight + r.top < 0 || r.top > vpheight) return true;
    var opacity = Math.max(0, Math.min(1, (r.top >= 0 ? vpheight - r.top : $(this).height() - Math.abs(r.top)) / vpheight));
    $(this).css("opacity", opacity);
  });
});


const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 178;
const currentFrame = index => (
  `../Mainpage/image/sunrise ${index.toString().padStart(3, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()