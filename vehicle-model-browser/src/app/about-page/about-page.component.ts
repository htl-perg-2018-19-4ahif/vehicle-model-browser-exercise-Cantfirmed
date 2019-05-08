import { Component, OnInit } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  public text;
  constructor() { }

  ngOnInit() {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      },
      suffix: '\n',
      paragraphLowerBound: 3,
      paragraphUpperBound: 7
    });
    this.text = lorem.generateParagraphs(5);
  }


}
