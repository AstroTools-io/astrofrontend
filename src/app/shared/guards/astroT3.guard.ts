import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { EtherService } from 'src/app/services/ether.service';

@Injectable({
  providedIn: 'root',
})
export class AstroTier3Guard implements CanLoad {
  constructor(private etherService: EtherService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.etherService.hasTier3Access;
  }
}
