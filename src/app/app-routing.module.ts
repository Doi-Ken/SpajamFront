import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
 // { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
 // { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
 // { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'camera', loadChildren: './pages/camera/camera.module#CameraPageModule' },
  { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
