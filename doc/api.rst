API Reference
=============

Main module
-----------

You can use **ruche** from your own projects. Achieving that is as simple as
requiring ``ruche`` from within your script.

* :ref:`ruche-alternatives`
* :ref:`ruche-help`
* :ref:`ruche-install`
* :ref:`ruche-uninstall`
* :ref:`ruche-version`

.. _ruche-alternatives:

``ruche.alternatives``
~~~~~~~~~~~~~~~~~~~~~~

Under construction...

.. _ruche-help:

``ruche.help``
~~~~~~~~~~~~~~

Under construction...

.. _ruche-install:

``ruche.install``
~~~~~~~~~~~~~~~~~

Under construction...

.. _ruche-uninstall:

``ruche.uninstall``
~~~~~~~~~~~~~~~~~~~

Under construction...

.. _ruche-version:

``ruche.version``
~~~~~~~~~~~~~~~~~

Under construction...

----

Command-line Interface
----------------------

The command-line interface (or ``cli``) is a module of **ruche**. It is a
wrapper around the main ``ruche`` module that is called when the user use the
binary from a prompt.

* :ref:`cli-alternatives`
* :ref:`cli-help`
* :ref:`cli-install`
* :ref:`cli-uninstall`
* :ref:`cli-version`

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

This function is a wrapper around ``ruche.help``. It output the appropriate **ruche** help to ``stdout`` according to the context.

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

This function is a wrapper around ``ruche.install``. It install the wanted packages and display some usefull information about the state of the process.

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

This function is a wrapper around ``ruche.uninstall``. It remove the wanted packages and display some usefull information about the state of the process.

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
~~~~~~~~~~~~~~~~~

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
