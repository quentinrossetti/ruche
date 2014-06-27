API Reference
=============

.. contents:: Table of Contents
   :local:

Main Module
-----------

You can use **ruche** from your own projects. Achieving that is as simple as
requiring ``ruche`` from within your script.

----

.. _ruche-alternatives:

``ruche.alternatives``
~~~~~~~~~~~~~~~~~~~~~~

This function allows you to switch between different versions and installations
of the same package. So both a bleeding edge and a legacy version are availables
at your fingertips.

.. js:function:: ruche.alternatives(package, callback)

    :param string package: The package you want to manipulate. It could be
        either in a *short format*: ``curl`` or in a *long format*:
        ``curl-7.36.0-win64``. To actually change the aliases in the path you
        have to specify a long format package name.
    :param function callback: It gets two arguments ``(err, data)`` where
        ``data`` is a flat array of locally availables packages (in *long
        format*: ``curl-7.36.0-win64``).
    :Fires:
        * ``alt-show``
        * ``alt-choice``
    :throws:
        * The version specified is not valid
    :Exemple:
        .. code-block:: js

            var ruche = require('ruche');
            // Show local alternatives
            ruche.alternatives('curl', function (err, data) {
              if (err) {
                // handle your error
              }
              console.dir(data); // [ 'curl-7.35.0-win32', 'curl-7.37.0-win64' ]
            });
            // Use one
            ruche.alternatives('curl-7.37.0-win64', function (err, data) {
              if (err) {
                // handle your error
              }
              console.dir(data); // [ 'curl-7.35.0-win32', 'curl-7.37.0-win64' ]
            });

----

.. _ruche-help:

``ruche.help``
~~~~~~~~~~~~~~

Get the local text help file content according to the specified ``context``.
This function gets one or two arguments, in all cases the last is a
*callback* function. When only one argument is given it gets the global
**ruche** help.

.. js:function:: ruche.help([context, ]callback)

    :param string context: The context of the wanted help. It could be either
        ``'global'``, ``undefined``, or a valid **ruche** command.
    :param function callback: A callback function that is executed when the
          help file is loaded. It gets two arguments ``(err, data)`` where
          ``data`` is the content of the help file.
    :throws:
        * Can't read the help file
    :Exemple:
        .. code-block:: js

            var ruche = require('ruche');
            // one argument
            ruche.help(function (err, data) {
              if (err) {
                // handle your error
              }
              console.log(data); // output the ruche help
            });
            // two arguments
            ruche.help('install', function (err, data) {
              if (err) {
                // handle your error
              }
              console.log(data); // output the install command help
            });

----

.. _ruche-install:

``ruche.install``
~~~~~~~~~~~~~~~~~

Install a list of new packages.

.. js:function:: ruche.install(packages, callback)

    :param array packages: The list of packages you want to install. This
          argument is an array of stings that could be either in a *short
          format*: ``curl`` or in a *long format*: ``curl-7.36.0-win64``.
    :param function callback: A callback function that is executed when all
          packages are installed. It gets two arguments ``(err, data)`` where
          ``data`` is a flat array of successfully installed packages (in
          *long format*: ``curl-7.36.0-win64``).
    :throws:
        * Can't reach URL
    :Exemple:
        .. code-block:: js

            var ruche = require('ruche');
            ruche.install(['git', 'curl-7.35.0-win32'], function (err, data) {
              if (err) {
                // handle your error
              }
              console.dir(data); // [ 'git-1.9.4-win32', 'curl-7.35.0-win32' ]
            });

----

.. _ruche-uninstall:

``ruche.uninstall``
~~~~~~~~~~~~~~~~~~~

Uninstall a list of packages.

.. js:function:: ruche.uninstall(packages, callback)

    :param array packages: The list of packages you want to romove. This
          argument is an array of stings that could be either in a *short
          format*: ``curl`` or in a *long format*: ``curl-7.36.0-win64``.
    :param function callback: A callback function that is executed when all
          packages are removed. It gets two arguments ``(err, data)`` where
          ``data`` is a flat array of successfully installed packages (in
          *long format*: ``curl-7.36.0-win64``).
    :throws:
        * Can't reach URL
    :Exemple:
        .. code-block:: js

            var ruche = require('ruche');
            ruche.uninstall(['git', 'curl-7.35.0-win32'], function (err, data) {
              if (err) {
                // handle your error
              }
              console.dir(data); // [ 'git-1.9.4-win32', 'curl-7.35.0-win32' ]
            });

----

.. _ruche-version:

``ruche.version``
~~~~~~~~~~~~~~~~~

This function parse the ``package.json`` file of the current **ruche**
installation to read its version number.

.. js:function:: ruche.version(callback)

    :param function callback: A callback function that is executed when the
          version number is loaded. It gets two arguments ``(err, data)``
          where ``data`` is the version number: a string like this ``'0.0.1'``.
    :throws:
        * Can't read the ruche package.json file
        * Can't parse the ruche package.json file
    :Exemple:
        .. code-block:: js

            var ruche = require('ruche');
            ruche.version(function (err, data) {
              if (err) {
                // handle your error
              }
              console.log(data); // output the ruche version number
            });

----

Command-line Interface
----------------------

The command-line interface (or ``cli``) is a module of **ruche**. It is a
wrapper around the main ``ruche`` module that is called when the user use the
binary from a prompt.

----

.. _cli-alternatives:

``cli.alternatives``
~~~~~~~~~~~~~~~~~~~~


This function is a wrapper around ``ruche.alternatives``. It displays the
available to ``stdout`` versions of a package and prompt the user on which one
to use.

.. js:function:: cli.alternatives(argv[, callback])

    :param object argv: An usable object of arguments and options.
    :param function callback: A callback function that is executed when the
        output has been written. It gets one argument ``(data)``.
    :Fires:
        * ``cli-alt-show``
        * ``cli-alt-choice``
    :See: :ref:`ruche-alternatives`
    :Exemple:
        .. code-block:: js

            var cli = require('./lib/cli');
            cli.alternatives(argv, function (data) {
              console.log(data); // output a second time
            });

----

.. _cli-help:

``cli.help``
~~~~~~~~~~~~

This function is a wrapper around ``ruche.help``. It output the appropriate
**ruche** help to ``stdout`` according to the context.

.. js:function:: cli.help(context[, callback])

    :param string argv: The context of the wanted help. It should be a valid
        **ruche** command or ``'global'``.
    :param function callback: A callback function that is executed when the
        output has been written. It gets one argument ``(data)``.
    :See: :ref:`ruche-help`
    :Exemple:
        .. code-block:: js

            var cli = require('./lib/cli');
            cli.help(function (data) {
              console.log(data); // output a second time
            });

----

.. _cli-install:

``cli.install``
~~~~~~~~~~~~~~~

This function is a wrapper around ``ruche.install``. It install the wanted
packages and display some usefull information about the state of the process.

.. js:function:: cli.install(argv[, callback])

    :param string argv: An usable object of arguments and options.
    :param function callback: A callback function that is executed when the
        output has been written. It gets one argument ``(data)``.
    :See: :ref:`ruche-install`
    :Exemple:
        .. code-block:: js

            var cli = require('./lib/cli');
            cli.install({ packages: ['curl'] }, function (data) {
              console.log(data); // output a second time
            });

----

.. _cli-uninstall:

``cli.uninstall``
~~~~~~~~~~~~~~~~~

This function is a wrapper around ``ruche.uninstall``. It remove the wanted
packages and display some usefull information about the state of the process.

.. js:function:: cli.uninstall(argv[, callback])

    :param string argv: An usable object of arguments and options.
    :param function callback: A callback function that is executed when the
        output has been written. It gets one argument ``(data)``.
    :See: :ref:`ruche-uninstall`
    :Exemple:
        .. code-block:: js

            var cli = require('./lib/cli');
            cli.uninstall({ packages: ['curl'] }, function (data) {
              console.log(data); // output a second time
            });

----

.. _cli-version:

``cli.version``
~~~~~~~~~~~~~~~

This function is a wrapper around ``ruche.version``. It output the **ruche**
version number to ``stdin``.

.. js:function:: cli.version([callback])

    :param function callback: A callback function that is executed when the
        output has been written. It gets one argument `(data)` where ``data``
        is the version number: a string like this ``'0.0.1'``.
    :See: :ref:`ruche-version`
    :Exemple:
        .. code-block:: js

            var cli = require('./lib/cli');
            cli.version(function (data) {
              console.log(data); // output a second time
            });

----

Utilities: ruche
----------------

The following functions are called by the main module.


----

.. _util-download:

``util.download``
~~~~~~~~~~~~~~~~~~~~

Download a ruche package from a repository. This uses ``rc`` module to
determine the source repository and the output directory.

.. js:function:: util.download(match, i, callback)

    :param object match: An object of parameters about the package that will
        be downloaded. Typically this value come from a ``ruche.json`` file.
    :param number i: This identify the current download. This is usefull for
        catching events when *multiple downloads* are required. ``i`` is used
        in the name of the events that are fired.
    :param function callback: A callback function that is executed when the
          file is downloaded and written to the file system. It gets two
          arguments ``(err, location)`` where ``location`` is the local path to
          the file.
    :Fires:
        *  ``dl-start-i``
        *  ``dl-data-i``
        *  ``dl-done-i``
    :throws:
        * Unaccessible URI
    :Exemple:
        .. code-block:: js

            var rucheUtil = require('./lib/ruche/util');
            rucheUtil.download(match, 0, function (err, location) {
              if (err) {
                // handle your error
              }
              console.log(location); // where the file is located
            });

----

.. _util-emitter:

``util.emitter``
~~~~~~~~~~~~~~~~

Require this to get access to the *ruche specific events*. This inherits
directly from the node native class EventEmitter. The extends method in use
is the *Underscore.js* one.

.. js:function:: util.emitter()

    :returns: *(object)* – The ruche internal event emitter.
    :Exemple:
        .. code-block:: js

            var rucheUtil = require('./lib/ruche/util');
            rucheUtil.emitter.on('dl-start-0', function (length) {
              console.log('This download is %sB long', length);
            });

----

.. _util-error:

``util.error``
~~~~~~~~~~~~~~

It is never a good idea to let a process continue on unknown error. This
function helps you handling this situation by emitting an ``error`` event.

.. js:function:: util.error()

    :Fires:
        * error
    :Exemple:
        .. code-block:: js

            var error = require('./lib/ruche/util/error');
            error();

----

.. _util-extract:

``util.extract``
~~~~~~~~~~~~~~~~

This method use a precedent download and extract it. This uses ``rc`` module
to determine the the ``tpm`` and ``share`` directories, respectively where
download are stored and where to extract them.

.. js:function:: util.extract(match, i, callback)

    :param object match: An object of parameters about the package that will
        be extracted. Typically this value come from a ``ruche.json`` file.
    :param number i: i This identify the current operation. This is usefull
        for catching events when *multiple extractions* are required. ``i``
        is used in the name of the events that are fired.
    :param function callback: A callback function that is executed when the
        file is extracted and written to the file system. It gets two arguments
        ``(err, location)`` where ``location`` is the local path to the file.
    :Fires:
        * gz-start-i
        * gz-data-i
        * gz-done-i
        * tar-start-i
        * tar-data-i
        * tar-done-i
    :throws:
        * No downloaded package to extract
    :Exemple:
        .. code-block:: js

            var rucheUtil = require('./lib/ruche/util');
            rucheUtil.extract(match, 0, function (err, location) {
              if (err) {
                // handle your error
              }
              console.log('Package extracted to %s');
            });

----

.. _util-match:

``util.match``
~~~~~~~~~~~~~~

This function parse a ``ruche.json``. Those files describes all the packages
available. By passing a ``wanted`` argument you choose the specifications of
the package you want.

.. js:function:: util.match(wanted, data)

    :param object wanted: Package and spec you want. It's an object with at
        least one key ``package``. Optionnals keys can be added: ``version``
        and ``platform``.
    :param object data: The content of a ``ruche.json`` file.
        is used in the name of the events that are fired.
    :returns: *(object)* – Return the info of the best package.
    :Exemple:
        .. code-block:: js

            var rucheUtil = require('./lib/ruche/util');
            var data = {}; // content of a ruche.json file
            var match = rucheUtil.match({ package: 'curl' }, data);

----

.. _util-register:

``util.register``
~~~~~~~~~~~~~~~~~

Read a entry of a ``ruche.json`` file and copy and make aliases for all files
under the ``bin`` category. Those aliases are placed in the `bin` local folder
indicated by the ``rc`` configuration.

.. js:function:: util.register(match, i, callback)

    :param object match: An object of parameters about the package that will
          be downloaded. Typically this value come from a `ruche.json` file.
    :param number data: This identify the current operation. This is usefull
        for catching events when *multiple operations* are required. ``i`` is
        used in the name of the events that are fired.
    :param function callback: A callback function that is executed when the
        aliases are created. It gets one argument ``binaries``.
    :Fires:
        * reg-start-i
        * reg-data-i
        * reg-done-i
    :Exemple:
        .. code-block:: js

            var rucheUtil = require('./lib/ruche/util');
            rucheUtil.register(match, 0, function (binaries) {
                console.log(binaries); // where the aliases are located
                // [
                //   { bin: 'run', file: 'path/to/run'},
                //   { bin: 'stop', file: 'path/to/stop'}
                // ]
            });

----

.. _util-remove:

``util.remove``
~~~~~~~~~~~~~~~

Remove a package from the local **ruche** installation. It uses the ``rc``
module to find the directories to empty and a ``ruche.json`` file to find the
binaires to unregister.

.. js:function:: util.remove(match, i, callback)

    :param object match: An object of parameters about the package that will
          be removed. Typically this value come from a `ruche.json` file.
    :param number data: This identify the current operation. This is usefull
        for catching events when *multiple operations* are required. ``i`` is
        used in the name of the events that are fired.
    :param function callback: A callback function that is executed when all is
        done.
    :Fires:
        * unreg-start-i
        * unreg-done-i
    :Exemple:
        .. code-block:: js

            var rucheUtil = require('./lib/ruche/util');
            rucheUtil.remove(match, 0, function () {
              console.log('Done!');
            });

----

.. _util-untilde:

``util.untilde``
~~~~~~~~~~~~~~~~

Parse a sting and convert it into a valid path. Different symbols can be
added:  ``~`` represents the home directory of the user (like:
`C:/Users/MyProfile`). ``@`` represents the installation folder of the current
**ruche** installation.

.. js:function:: util.untilde(path)

    :param string path: The string to parse.
    :returns: *(string)* – Return the resolved path.
    :Exemple:
        .. code-block:: js

            var rucheUtil = require('./lib/ruche/util');
            var home = rucheUtil.untilde('~'); // user home directory
            var root = rucheUtil.untilde('@'); // ruche root

----

.. _util-valid:

``util.valid``
~~~~~~~~~~~~~~

Returns an object of valid options for each commands or context. Each key in the
object is a context and each value an array of valid options.

.. js:function:: util.valid()

    :returns: *(object)* – An object of valid options for each context.
    :Exemple:
        .. code-block:: js

            var rucheUtil = require('./lib/ruche/util');
            // Get the valid options of the `alternatives` command
            rucheUtil.valid().alternatives; // [ 'choice' ]

----

Utilities: CLI
--------------

The following functions are called by the cli module.

----

.. _cliutil-argv:

``cliUtil.argv``
~~~~~~~~~~~~~~~~

This function parse the command from ``stdin`` into an object that is usable
by the Cli.

.. js:function:: cliUtil.argv(argv)

    :param object argv: From ``stdin``.
    :returns: *(object)* – An usable object of arguments and options.
    :Exemple:
        .. code-block:: js

            var cliUtil = require('./lib/cli/util');
            var args = cliUtil.argv(process.argv);

----

.. _cliutil-error:

``cliUtil.error``
~~~~~~~~~~~~~~~~~

This function logs a colorful error to ``stdoud``.

.. js:function:: cliUtil.error(err)

    :param Error err: The error to log.
    :returns: *(string)* – The message of the error.
    :Exemple:
        .. code-block:: js

            var cliUtil = require('./lib/cli/util');
            var e = new Error('Nop!');
            cliUtil.error(e);

----

.. _internal-events:

Internal Events
---------------

Both ``ruche`` and ``cli`` modules emit and listen to events. You can also hook
into this events to implement you own buisness logic.

.. js:function:: emit('cli-alt-show')

    :Event: Emitted when the alternatives are printed to stdout.

.. js:function:: emit('cli-alt-choice', number)

    :Event: Emitted when the user has chosen an alternative.
    :param number answer: The number chosen by the user.

.. js:function:: emit('alt-show', alternatives)

    :Event: Emitted when alternatives are availables
    :param array alternatives: Locally availables versions of the package.

.. js:function:: emit('alt-choice', package)

    :Event: Emitted when the user chose an alternative version.
    :param number package: The package name in *long format*.

.. js:function:: emit('install-i', match)

    :Event: Emitted when got a match. ``i`` is an identifier.
    :param object match: Info about the package.

.. js:function:: emit('uninstall-i', match)

    :Event: Emitted when got a match. ``i`` is an identifier.
    :param object match: Info about the package.

.. js:function:: emit('dl-start-i', length)

    :Event: Emitted when starting download. ``i`` is an identifier.
    :param number length: The total length of the file.

.. js:function:: emit('dl-data-i', chunk)

    :Event: Emitted when receiving data. ``i`` is an identifier.
    :param object chunk: Chunk of data.

.. js:function:: emit('dl-done-i')

    :Event: Emitted when the file is downloaded and written to the file system.
        ``i`` is an identifier.

.. js:function:: emit('error', err)

    :Event: Emitted when an uncaughtException occurs.
    :param Error err: The error to handle.

.. js:function:: emit('gz-start-i', length)

    :Event: Emitted when starting unzipping. ``i`` is an identifier.
    :param number length: The total length of the file.

.. js:function:: emit('gz-data-i', chunk)

    :Event: Emitted when receiving data from unzipping. ``i`` is an identifier.
    :param object chunk: Chunk of data.

.. js:function:: emit('gz-done-i')

    :Event: Emitted when unzipping is done. ``i`` is an identifier.

.. js:function:: emit('tar-start-i', length)

    :Event: Emitted when starting un-tar. ``i`` is an identifier.
    :param number length: The total length of the file.

.. js:function:: emit('tar-data-i', chunk)

    :Event: Emitted when receiving data from tar. ``i`` is an identifier.
    :param object chunk: Chunk of data.

.. js:function:: emit('tar-done-i')

    :Event: Emitted when the package is copied into ``share``. ``i`` is an
        identifier.

.. js:function:: emit('reg-start-i', length)

    :Event: Emitted when start registering. ``i`` is an identifier.
    :param number length: The number of aliases to register

.. js:function:: emit('reg-data-i', chunk)

    :Event: Emitted when an alias is created. ``i`` is an identifier.
    :param object chunk: Identifier: registered file index.

.. js:function:: emit('reg-done-i')

    :Event: Emitted when all aliases are created. ``i`` is an identifier.

.. js:function:: emit('unreg-start-i')

    :Event: Emitted when start removeing. ``i`` is an identifier.

.. js:function:: emit('unreg-done-i')

    :Event: Emitted when removing is done. ``i`` is an identifier.
