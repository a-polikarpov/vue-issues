interface ElI extends HTMLElement {
  clickOutsideEvent: (event: MouseEvent) => void;
}

type ClickEvent = (event: MouseEvent) => void;
type Binding = any;

export default (() => {
  let clickOutsideEvent: ClickEvent | null = null;
  return {
    mounted(el: ElI, binding: Binding): void {
      setTimeout(() => {
        clickOutsideEvent = (event: MouseEvent) => {
          if (!(el === event.target || el.contains(event.target as Node))) {
            binding.value(event, el);
          }
        };
        document.body.addEventListener('click', clickOutsideEvent as ClickEvent);
      });
    },
    unmounted(): void {
      document.body.removeEventListener('click', clickOutsideEvent as ClickEvent);
      clickOutsideEvent = null;
    },
  };
})();
