import React, { useCallback, useState } from 'react';
import type { Meta, Story } from '@storybook/react/types-6-0';
import { nanoid } from 'nanoid';
import { Button } from '../../Button';
import { Modal as BaseModal, ModalWithOnClose, ModalWithOnRequestClose } from '..';

import styles from './index.stories.module.scss';

export default {
  title: 'Elements/Modal',
  component: BaseModal,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [(story) => <div className={styles.modalPreview}>{story()}</div>],
  argTypes: {
    children: {
      description: 'Текст',
      control: {
        type: 'text',
      },
      table: {
        category: 'Children',
      },
    },
  },
} as Meta;

const Modal = Object.assign((props: ModalWithOnRequestClose | ModalWithOnClose) => {
  const parentSelector = useCallback(
    () => (props.id && document.getElementById(props.id)) || document.body,
    [props.id],
  );
  return <BaseModal {...props} parentSelector={parentSelector} />;
}, BaseModal);

const PlaygroundTemplate: Story<ModalWithOnRequestClose | ModalWithOnClose> = () => {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const [id] = useState(nanoid);

  return (
    <div id={id} className={styles.modalPreview}>
      <Button onClick={open}>Открыть модальное окно</Button>
      <Modal
        id={id}
        isOpen={isOpen}
        onRequestClose={close}
        shouldFocusAfterRender={false}
        shouldReturnFocusAfterClose={false}
      >
        <Modal.Body>
          <p>
            Утконос был открыт в XVIII веке во время колонизации Нового Южного Уэльса. В
            опубликованном в 1802 году списке животных этой колонии упоминается «животное-амфибия из
            рода кротов. Наиболее любопытное его качество — это то, что оно обладает вместо обычного
            рта утиным клювом, позволяющим ему питаться в иле, как птицам». Первая шкура утконоса
            была прислана в Англию в 1797 году. Её вид породил ожесточённые споры среди научной
            общественности. Сперва шкуру сочли изделием какого-то таксидермиста, пришившего утиный
            клюв к шкуре зверька, похожего на бобра. Рассеять это подозрение удалось Джорджу Шоу,
            изучившему посылку и пришедшему к выводу, что это не подделка (для этого Шоу даже
            надрезал шкуру в поисках стежков). Возник вопрос, к какой группе животных отнести
            утконоса. Уже после того, как он получил своё научное название, в Англию были доставлены
            первые зверьки, и выяснилось, что у самки утконоса нет видимых молочных желез, зато это
            животное, подобно птицам, имеет клоаку. Четверть века учёные не могли решить, куда
            отнести утконоса — к млекопитающим, птицам, пресмыкающимся или вообще к отдельному
            классу, пока в 1824 году немецкий биолог Меккель не обнаружил, что у утконоса всё-таки
            имеются молочные железы, и самка выкармливает детёнышей молоком. То, что утконос
            откладывает яйца, было доказано только в 1884 году. Зоологическое имя этому странному
            животному дал в 1799 году английский натуралист Джордж Шоу — Platypus anatinus, от
            др.-греч. πλατύς — широкий, плоский, πούς — лапа и лат. anatinus — утиный. В 1800 году
            Иоганн-Фридрих Блуменбах во избежание омонимии с родом жуков-короедов Platypus изменил
            родовое название на Ornithorhynchus, от др.-греч. ὄρνις — птица, ῥύγχος — клюв.
            Аборигены Австралии знали утконоса под многими именами, включая mallangong, boondaburra
            и tambreet. Ранние европейские переселенцы называли его «утконос» (duckbill), «уткокрот»
            (duckmole) и «водяной крот» (watermole). В настоящее время в английском языке
            используется название platypus. В русском языке закрепилось название «утконос».
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});

Playground.args = {
  children: null,
  closeButtonComponent: undefined,
  closeTimeoutMS: undefined,
  width: undefined,
};

export const Minimal = () => {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const [id] = useState(nanoid);

  return (
    <div id={id}>
      <Button onClick={open}>Открыть модальное окно</Button>
      <Modal
        id={id}
        isOpen={isOpen}
        onRequestClose={close}
        shouldFocusAfterRender={false}
        shouldReturnFocusAfterClose={false}
      />
    </div>
  );
};

export const Width = () => {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const [id] = useState(nanoid);

  return (
    <div id={id}>
      <Button onClick={open}>Открыть модальное окно</Button>
      <Modal id={id} width="400px" isOpen={isOpen} onRequestClose={close}>
        <Modal.Title>Заголовок модального окна</Modal.Title>
        <Modal.Body>
          <div
            style={{
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'lightcoral',
            }}
          >
            ШИРИНА: 400px
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export const Title = () => {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const [id] = useState(nanoid);

  return (
    <div id={id}>
      <Button onClick={open}>Открыть модальное окно</Button>
      <Modal id={id} width="400px" isOpen={isOpen} onRequestClose={close}>
        <Modal.Title>Заголовок модального окна</Modal.Title>
        <Modal.Body>
          <p>
            <span>Некий</span>
            <br />
            <span>контент</span>
            <br />
            <span>в теле модалки</span>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={close}>Закрыть модальное окно</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const WithoutHeaderCloseButton = () => {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const [id] = useState(nanoid);

  return (
    <div id={id}>
      <Button onClick={open}>Открыть модальное окно</Button>
      <Modal
        id={id}
        closeButtonComponent={null}
        width="400px"
        isOpen={isOpen}
        onRequestClose={close}
      >
        <Modal.Title>Заголовок модального окна</Modal.Title>
        <Modal.Body>
          <p>
            <span>Некий</span>
            <br />
            <span>контент</span>
            <br />
            <span>в теле модалки</span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Закрыть модальное окно</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

WithoutHeaderCloseButton.storyName = 'Without header close button';

export const ShouldCloseOnOverlayClick = () => {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const [id] = useState(nanoid);

  return (
    <div id={id}>
      <Button onClick={open}>Открыть модальное окно</Button>
      <Modal
        closeButtonComponent={null}
        shouldCloseOnOverlayClick={false}
        id={id}
        width="400px"
        isOpen={isOpen}
        onRequestClose={close}
      >
        <Modal.Title>Заголовок модального окна</Modal.Title>
        <Modal.Body>Текст модального окна</Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Закрыть можно только этой кнопулей</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ShouldCloseOnOverlayClick.storyName = "Don't close on overlay click";

export const HeaderWithElement = () => {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const [id] = useState(nanoid);

  return (
    <div id={id}>
      <Button onClick={open}>Открыть модальное окно</Button>
      <Modal id={id} width="400px" isOpen={isOpen} onRequestClose={close}>
        <Modal.Title>
          <em style={{ backgroundColor: 'lightcoral', borderRadius: 10, padding: 10 }}>
            Вау какой заголовок
          </em>
        </Modal.Title>
        <Modal.Body>
          <p>
            <span>Некий</span>
            <br />
            <span>контент</span>
            <br />
            <span>в теле модалки</span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Закрыть модальное окно</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

HeaderWithElement.storyName = 'Header with Element';

export const Footer = () => {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const [id] = useState(nanoid);

  return (
    <div id={id}>
      <Button onClick={open}>Открыть модальное окно</Button>
      <Modal id={id} width="400px" isOpen={isOpen} onRequestClose={close}>
        <Modal.Title>Заголовок модального окна</Modal.Title>
        <Modal.Body>
          <p>
            <span>Некий</span>
            <br />
            <span>контент</span>
            <br />
            <span>в теле модалки</span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button small onClick={close} view="secondary">
            Отмена
          </Button>
          <Button small onClick={close}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const ContentWithScrollPadding = () => {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const [id] = useState(nanoid);

  return (
    <div id={id}>
      <Button onClick={open}>Открыть модальное окно</Button>
      <Modal id={id} width="600px" isOpen={isOpen} onRequestClose={close}>
        <Modal.Title>Заголовок модального окна</Modal.Title>
        <Modal.Body>
          <p style={{ backgroundColor: 'lightcoral', height: '2000px' }}>
            <span>Некий</span>
            <br />
            <span>контент</span>
            <br />
            <span>в теле модалки</span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button small onClick={close} view="secondary">
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const Side = () => {
  const [isOpenLeft, setIsOpenLeft] = useState(false);
  const [isOpenRight, setIsOpenRight] = useState(false);
  const parentSelector = useCallback(
    () => document.getElementById('docs-root') || document.body,
    [],
  );

  return (
    <div className="sb-col">
      <div className="sb-row">
        <Button onClick={() => setIsOpenLeft(true)}>Открыть * ЛЕВОЕ * модальное окно</Button>
        <Button onClick={() => setIsOpenRight(true)}>Открыть * ПРАВОЕ * модальное окно</Button>
        <Modal
          side="left"
          width="500px"
          isOpen={isOpenLeft}
          parentSelector={parentSelector}
          onRequestClose={() => setIsOpenLeft(false)}
        >
          <Modal.Title>
            Заголовок модального окна
            <br /> левой стороны
          </Modal.Title>
          <Modal.Body>
            <p>Я слева</p>
          </Modal.Body>
          <Modal.Footer>
            <Button small onClick={() => setIsOpenLeft(false)} view="secondary">
              Отмена
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          side="right"
          width="500px"
          isOpen={isOpenRight}
          parentSelector={parentSelector}
          onRequestClose={() => setIsOpenRight(false)}
        >
          <Modal.Title>
            Заголовок модального окна
            <br /> правой стороны
          </Modal.Title>
          <Modal.Body>
            <p>А я справа️</p>
          </Modal.Body>
          <Modal.Footer>
            <Button small onClick={() => setIsOpenRight(false)} view="secondary">
              Отмена
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
