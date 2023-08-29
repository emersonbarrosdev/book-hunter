import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { eTheme } from '../../enums/eTheme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  applyTheme: eTheme = eTheme.TEXT_LIGHT;
  applyIcon: eTheme = eTheme.ICON_MOON;
  mobileQuery: MediaQueryList;

  constructor(
    public headerTranslate: TranslateService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(() => changeDetectorRef.detectChanges());

    headerTranslate.setDefaultLang('en');
    const browserLang = headerTranslate.getBrowserLang();
    headerTranslate.use(browserLang.match(/en/) ? browserLang : 'en');
  }

  get isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  toggle() {
    const theme = document.body.classList.toggle('dark-theme');
    if (theme) {
      this.applyTheme = eTheme.TEXT_DARK
      return this.applyIcon = eTheme.ICON_SUN
    }
    this.applyTheme = eTheme.TEXT_LIGHT
    return this.applyIcon = eTheme.ICON_MOON
  }

  reloadPage() {
    this.router.navigate(['/'])
  }
}
