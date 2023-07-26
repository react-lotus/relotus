import { Button } from '../Button';
import { AppName as AppNameOriginal } from '../AppName';
import type { AppNameComponent } from '../AppName';
import { SidebarItem } from '../SidebarItem';
import type { SidebarItemLogoComponent } from '../Sidebar';
import { Card } from '../Card';
import { PageLayout } from '../PageLayout';
import type { PageLayoutProps } from '../PageLayout';
import criticalErrorSvg from './assets/criticalError.svg';
import './index.scss';

const DefaultAppName: AppNameComponent = (props) => {
  return <AppNameOriginal as="a" href="/" {...props} />;
};

const DefaultSidebarItemLogo: SidebarItemLogoComponent = (props) => {
  return <SidebarItem as="a" href="/" {...props} />;
};

const retry = () => {
  window.location.reload();
};

export interface CriticalErrorPageProps extends Omit<PageLayoutProps, 'children'> {
  /** Идентификатор ошибки для информирования пользователя */
  eventId: string | null;
}

/**
 * Страница критической ошибки
 */
export function CriticalErrorPage(props: CriticalErrorPageProps): JSX.Element {
  const {
    eventId,
    appNameComponent: AppName = DefaultAppName,
    sidebarItemLogoComponent: SidebarItemLogo = DefaultSidebarItemLogo,
    ...pageLayoutProps
  } = props;
  return (
    <PageLayout
      appNameComponent={AppName}
      sidebarItemLogoComponent={SidebarItemLogo}
      {...pageLayoutProps}
    >
      <Card className="uu-criticalErrorPage">
        <img
          className="uu-criticalErrorPage__icon"
          src={criticalErrorSvg}
          alt="Критическая ошибка"
        />
        <h2 className="uu-criticalErrorPage__title">Произошла критическая ошибка</h2>
        {eventId ? (
          <p className="uu-criticalErrorPage__message">
            Отчет о данной ошибке был отправлен в службу поддержки.
            <br />
            Попробуйте перезагрузить страницу через несколько минут.
            <br />
            Если проблема не была устранена - сообщите идентификатор ошибки{' '}
            <strong>{eventId}</strong> в службу поддержки, и вам будет предоставлена дополнительная
            информация.
          </p>
        ) : (
          <p className="uu-criticalErrorPage__message">
            Попробуйте перезагрузить страницу через несколько минут.
          </p>
        )}
        <div className="uu-criticalErrorPage__buttonGroup">
          <Button className="uu-criticalErrorPage__button" onClick={retry}>
            Перезагрузить
          </Button>
          <Button as="a" href="/" className="uu-criticalErrorPage__button" view="secondary">
            Перейти на главную
          </Button>
        </div>
      </Card>
    </PageLayout>
  );
}
