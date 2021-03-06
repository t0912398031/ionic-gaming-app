import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/authGuard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'test', loadChildren: './pages/test/test.module#TestPageModule', canActivate: [AuthGuardService] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuardService] },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule', canActivate: [AuthGuardService] },
  { path: 'editprofile', loadChildren: './pages/profile/editprofile/editprofile.module#EditprofilePageModule', canActivate: [AuthGuardService] },
  { path: 'userprofile/:id', loadChildren: './pages/userprofile/userprofile.module#UserprofilePageModule', canActivate: [AuthGuardService] },
  { path: 'userprofile/:id/gameinfo', loadChildren: './pages/userprofile/gameinfo/gameinfo.module#GameinfoPageModule',canActivate: [AuthGuardService] },
  { path: 'editgameinfo', loadChildren: './pages/profile/editgameinfo/editgameinfo.module#EditgameinfoPageModule', canActivate: [AuthGuardService] }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
