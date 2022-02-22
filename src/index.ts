import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { URLExt } from '@jupyterlab/coreutils';

/**
 * Initialization data for the jupyterlab-ncar-menu extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-ncar-menu:plugin',
  autoStart: true,
  requires: [ICommandPalette,JupyterFrontEnd.IPaths],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    paths: JupyterFrontEnd.IPaths
  ) => {
    console.log('JupyterLab extension jupyterlab-ncar-menu is activated!');

    const { commands } = app;

    const baseUrl = paths.urls.base;
    const hubHost = paths.urls.hubHost || '';
    const hubPrefix = paths.urls.hubPrefix || '';
    const hubUser = paths.urls.hubUser || '';
    //const hubServerName = paths.urls.hubServerName || '';
    
    //var tgtUrl = '';
    var deactivateFlag = false;
    const helpUrl = 'https://arc.ucar.edu/knowledge_base/70549913';
    const mainUrl = 'https://jupyterhub.hpc.ucar.edu';
    var hubControlPanelUrl = '';
    // var serversUrl = '';


    if (!hubPrefix) {
      deactivateFlag = true;
    } else {
      hubControlPanelUrl = hubHost + URLExt.join(hubPrefix,hubUser,'home');
      // serversUrl = hubHost + URLExt.join(hubPrefix,'hub','home')
    }

    if (deactivateFlag) {
      console.log('Should deactivate menu and possibly return early as to not register.')
    }

    console.log('Base URL: ' + baseUrl);

    var command = 'ncar:main';
    commands.addCommand(command, {
      label: 'JupyterHub Portal',
      caption: 'JupyterHub Portal',
      execute: (args: any) => {
        console.log(
          `ncar:menu has been called ${args['origin']}`
        );
        window.open(mainUrl,'_blank');
      },
    });

    const category = 'NCAR';
    palette.addItem({
      command,
      category,
      args: { origin: 'from the palette' }
    });

    command = 'ncar:ctrl';
    commands.addCommand(command,{ 
      label: 'My Servers',
      caption: 'My Servers',
      execute: (args: any) => {
        console.log(
          `ncar:menu has been called ${args['origin']}`
        );
        window.open(hubControlPanelUrl);
      },
    });

    palette.addItem({
      command,
      category,
      args: { origin: 'from the palette' }
    });

    command = 'ncar:help';
    commands.addCommand(command,{
      label: 'NCAR Help',
      caption: 'NCAR Help',
      execute: (args: any) => {
        console.log(`ncar:help has been called ${args['origin']}`);
        window.open(helpUrl,'_blank');
      }
    });

    palette.addItem({
      command,category,args: { origin: 'from the palette'}
    });

    command = 'ncar:geocat';
    commands.addCommand(command,{
      label: 'NCAR GeoCAT',
      caption: 'NCAR GeoCAT',
      execute: (args: any) => {
        window.open('https://geocat.ucar.edu/','_blank');
      }
    });
    palette.addItem({command,category,args: {origin: 'from the palette'}});

    command = 'ncar:pythia';
    commands.addCommand(command,{
      label: 'Project Pythia',
      caption: 'Project Pythia',
      execute: (args: any) => {
        window.open('http://projectpythia.org/','_blank');
      }
    })
    palette.addItem({command,category,args: {origin: 'from the palette'}})

  }
};

export default plugin;
