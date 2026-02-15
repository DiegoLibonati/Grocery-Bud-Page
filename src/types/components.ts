export interface Component {
  cleanup?: () => void;
}

export interface ButtonPrimaryComponent extends Component, HTMLButtonElement {}
export interface ItemComponent extends Component, HTMLLIElement {}
