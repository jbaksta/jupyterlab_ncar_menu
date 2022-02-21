import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab-ncar-menu extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-ncar-menu:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-ncar-menu is activated!');
  }
};

export default plugin;
