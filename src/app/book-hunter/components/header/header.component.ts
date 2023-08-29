import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ETheme } from '../../enums/eTheme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  applyTheme: ETheme = ETheme.TEXT_LIGHT;
  applyIcon: ETheme = ETheme.ICON_MOON;
  mobileQuery: MediaQueryList;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(() => changeDetectorRef.detectChanges());
  }

  get isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  toggle() {
    const theme = document.body.classList.toggle('dark-theme');
    if (theme) {
      this.applyTheme = ETheme.TEXT_DARK;
      this.applyIcon = ETheme.ICON_SUN;
    } else {
      this.applyTheme = ETheme.TEXT_LIGHT;
      this.applyIcon = ETheme.ICON_MOON;
    }
  }


  reloadPage() {
    this.router.navigate(['/'])
  }
}
