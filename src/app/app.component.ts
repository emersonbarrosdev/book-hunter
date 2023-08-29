import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookHunter';

  constructor(
    public bhTranslate: TranslateService) {
    bhTranslate.setDefaultLang('pt_BR');
    const browserLang = bhTranslate.getBrowserLang();
    bhTranslate.use(browserLang.match(/pt_BR/) ? browserLang : 'pt_BR');
  }
}
