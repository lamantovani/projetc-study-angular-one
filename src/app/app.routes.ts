import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { UtilsDemoComponent } from './demo/view/utilsdemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { BuyComponent } from './buy/buy.component';
import { MachineComponent } from './machine/machine.component';
import { CardDataComponent } from './card-data/card-data.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AuthGuard } from './service/auth.guard';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    {
        path: '', component: DashboardComponent,
        children: [
            { path: 'access-denied', component: AccessDeniedComponent },
            { path: 'signup', component: SignupComponent, pathMatch: 'full' },
            { path: 'redirect/:guId', component: SignupComponent, canActivate: [AuthGuard] },
            { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
            { path: 'buy', component: BuyComponent, canActivate: [AuthGuard] },
            { path: 'machine', component: MachineComponent, canActivate: [AuthGuard] },
            { path: 'card-data', component: CardDataComponent, canActivate: [AuthGuard] },
            // { path: 'card-data', component: CardDataComponent },
            { path: 'receipt/:type', component: ReceiptComponent, canActivate: [AuthGuard] },
            { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'home', component: LandingComponent },
    { path: 'sample', component: SampleDemoComponent },
    { path: 'forms', component: FormsDemoComponent },
    { path: 'data', component: DataDemoComponent },
    { path: 'panels', component: PanelsDemoComponent },
    { path: 'overlays', component: OverlaysDemoComponent },
    { path: 'menus', component: MenusDemoComponent },
    { path: 'messages', component: MessagesDemoComponent },
    { path: 'misc', component: MiscDemoComponent },
    { path: 'empty', component: EmptyDemoComponent },
    { path: 'charts', component: ChartsDemoComponent },
    { path: 'file', component: FileDemoComponent },
    { path: 'utils', component: UtilsDemoComponent },
    { path: 'documentation', component: DocumentationComponent },
    { path: 'login', component: LoginComponent },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
