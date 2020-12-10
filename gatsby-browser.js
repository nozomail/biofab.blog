import './src/utilities/styles/index.css';

export const onInitialClientRender = () => {
  setTimeout(function () {
    document.getElementById('___loader').style.opacity = '0';
    document.getElementById('___loader').style.pointerEvents = 'auto';
  }, 1000);
};
