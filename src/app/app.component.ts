import { Component, ElementRef } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  words = [];
  wordbank = [];
  correct: number = 0;
  total: number;
  timer: number = 0;
  interval: number;
  zIndexSerial: number = 1000;
  constructor(private elem: ElementRef) {}
  ngOnInit() {
    var passage =
      "Let him who walks in the dark, who has no light, trust in the name of the Lord and rely on his God. -Isaiah 50:10";
    var wordSplit = passage.split(" ");
    this.total = wordSplit.length;
    this.words = [...wordSplit];
    wordSplit = wordSplit.sort(() => Math.random() - 0.5);
    for (var i = 0; i < wordSplit.length; i++) {
      this.wordbank[i] = {
        value: wordSplit[i],
        disabled: false,
        position: { x: 0, y: 0 }
      };
    }
  }
  moveWord(event: any) {
    let el = event.source.getRootElement();
    el.style.zIndex = this.zIndexSerial;
    console.log(el.style.zIndex);
    this.zIndexSerial++;
    if (this.timer == 0) this.startTimer();
  }
  placeWord(event: any) {
    let el = event.source.getRootElement();
    let id = el.id.replace(/\D/g, "");
    let myPos = el.getBoundingClientRect();
    let myParentPos = this.getPosition(el);
    let elements = this.elem.nativeElement.querySelectorAll(
      ".word-placeholder"
    );
    let found = 0;
    for (var i = 0; i < elements.length; i++) {
      let dt = elements[i];
      if (dt.className == "word-placeholder") {
        var dtPos = dt.getBoundingClientRect();
        if (
          (myPos.left >= dtPos.left &&
            myPos.left < dtPos.right &&
            myPos.bottom <= dtPos.bottom &&
            myPos.bottom > dtPos.top) ||
          (myPos.left >= dtPos.left &&
            myPos.left < dtPos.right &&
            myPos.top >= dtPos.top &&
            myPos.top < dtPos.bottom) ||
          (myPos.right <= dtPos.right &&
            myPos.right > dtPos.left &&
            myPos.bottom <= dtPos.bottom &&
            myPos.bottom > dtPos.top) ||
          (myPos.right <= dtPos.right &&
            myPos.right > dtPos.left &&
            myPos.top >= dtPos.top &&
            myPos.top < dtPos.bottom)
        ) {
          if (el.innerHTML.trim() == dt.innerHTML.trim()) {
            found = 1;
            this.correct++;
            if (this.correct >= this.total) this.pauseTimer();
            this.wordbank[id].position = {
              x: dtPos.left - myPos.left + myPos.left - myParentPos.left,
              y: dtPos.top - myPos.top + myPos.top - myParentPos.top
            };
            this.wordbank[id].disabled = true;
            el.style.cursor = "auto";
            dt.classList.add("word-piece");
            dt.classList.remove("word-placeholder");
          }
          if (found) break;
        }
      }
    }
    if (!found) this.wordbank[id].position = { x: 0, y: 0 };
  }
  getPosition(el: any) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }
  startTimer() {
    this.interval = setInterval(() => {
      this.timer++;
    }, 1000);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  convertTime(seconds: number) {
    var mins: number = Math.floor(seconds / 60);
    var secs: number = seconds % 60;
    return (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
  }
}
