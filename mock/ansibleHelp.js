export default [
  {
    name: 'net_put',
    helpText: `
        > NET_PUT    (/usr/local/python36/lib/python3.6/site-packages/ansible/modules/network/files/net_put.py)

        This module provides functionality to copy file from Ansible controller to network devices.

  * note: This module has a corresponding action plugin.

OPTIONS (= is mandatory):

- dest
        Specifies the destination file. The path to destination file can either be the full path or relative path as supported by network_os.
        [Default: ['Filename from src and at default directory of user shell on network_os.']]

- mode
        Set the file transfer mode. If mode is set to \`text' then \`src' file will go through Jinja2 template engine to replace any vars if present in the src file. If mode is set to
        \`binary' then file will be copied as it is to destination device.
        (Choices: binary, text)[Default: binary]
        version_added: 2.7

- protocol
        Protocol used to transfer file.
        (Choices: scp, sftp)[Default: scp]

= src
        Specifies the source file. The path to the source file can either be the full path on the Ansible control host or a relative path from the playbook or role root directory.



NOTES:
      * Some devices need specific configurations to be enabled before scp can work These configuration should be pre-configured before using this module e.g ios - \`ip scp server
        enable'.
      * User privilege to do scp on network device should be pre-configured e.g. ios - need user privilege 15 by default for allowing scp.
      * Default destination of source file.

REQUIREMENTS:  scp

AUTHOR: Deepak Agrawal (@dagrawal)
        METADATA:
          status:
          - preview
          supported_by: network
        

EXAMPLES:
- name: copy file from ansible controller to a network device
  net_put:
    src: running_cfg_ios1.txt

- name: copy file at root dir of flash in slot 3 of sw1(ios)
  net_put:
    src: running_cfg_sw1.txt
    protocol: sftp
    dest : flash3:/running_cfg_sw1.txt

RETURN VALUES:
        `,
  },
  {
    name: 'reboot',
    helpText: `
      > REBOOT    (/usr/local/python36/lib/python3.6/site-packages/ansible/modules/system/reboot.py)

        Reboot a machine, wait for it to go down, come back up, and respond to commands.

  * note: This module has a corresponding action plugin.

OPTIONS (= is mandatory):

- connect_timeout
        Maximum seconds to wait for a successful connection to the managed hosts before trying again.
        If unspecified, the default setting for the underlying connection plugin is used.
        [Default: (null)]
        type: int

- msg
        Message to display to users before reboot.
        [Default: Reboot initiated by Ansible]
        type: str

- post_reboot_delay
        Seconds to wait after the reboot was successful and the connection was re-established.
        This is useful if you want wait for something to settle despite your connection already working.
        [Default: 0]
        type: int

- pre_reboot_delay
        Seconds for shutdown to wait before requesting reboot.
        On Linux, macOS, and OpenBSD this is converted to minutes and rounded down. If less than 60, it will be set to 0.
        On Solaris and FreeBSD this will be seconds.
        [Default: 0]
        type: int

- reboot_timeout
        Maximum seconds to wait for machine to reboot and respond to a test command.
        This timeout is evaluated separately for both network connection and test command success so the maximum execution time for the module is twice this amount.
        [Default: 600]
        type: int

- test_command
        Command to run on the rebooted host and expect success from to determine the machine is ready for further tasks.
        [Default: whoami]
        type: str


NOTES:
      * For Windows targets, use the [win_reboot] module instead.

AUTHOR: Matt Davis (@nitzmahone), Sam Doran (@samdoran)
        METADATA:
          status:
          - preview
          supported_by: core
        

EXAMPLES:
- name: Unconditionally reboot the machine with all defaults
  reboot:

- name: Reboot a slow machine that might have lots of updates to apply
  reboot:
    reboot_timeout: 3600

RETURN VALUES:


rebooted:
  description: true if the machine was rebooted
  returned: always
  type: boolean
  sample: true
elapsed:
  description: The number of seconds that elapsed waiting for the system to be rebooted.
  returned: always
  type: int
  sample: 23
      `,
  },
  {
    name: 'template',
    helpText: `
      > TEMPLATE    (/usr/local/python36/lib/python3.6/site-packages/ansible/modules/files/template.py)

        Templates are processed by the Jinja2 templating language (http://jinja.pocoo.org/docs/) - documentation on the template formatting can be found in the Template Designer
        Documentation (http://jinja.pocoo.org/docs/templates/). Six additional variables can be used in templates: \`ansible_managed' (configurable via the \`defaults' section of
        \`ansible.cfg') contains a string which can be used to describe the template name, host, modification time of the template file and the owner uid. \`template_host' contains the node
        name of the template's machine. \`template_uid' is the numeric user id of the owner. \`template_path' is the path of the template. \`template_fullpath' is the absolute path of the
        template. \`template_run_date' is the date that the template was rendered.

  * note: This module has a corresponding action plugin.

OPTIONS (= is mandatory):

- attributes
        Attributes the file or directory should have. To get supported flags look at the man page for \`chattr' on the target system. This string should contain the attributes in the same
        order as the one displayed by \`lsattr'.
        \`=' operator is assumed as default, otherwise \`+' or \`-' operators need to be included in the string.
        (Aliases: attr)[Default: (null)]
        version_added: 2.3

- backup
        Create a backup file including the timestamp information so you can get the original file back if you somehow clobbered it incorrectly.
        [Default: no]
        type: bool

- block_end_string
        The string marking the end of a block.
        [Default: %}]
        version_added: 2.4

- block_start_string
        The string marking the beginning of a block.
        [Default: {%]
        version_added: 2.4

= dest
        Location to render the template to on the remote machine.


- follow
        This flag indicates that filesystem links in the destination, if they exist, should be followed.
        Previous to Ansible 2.4, this was hardcoded as \`yes'.
        [Default: no]
        type: bool
        version_added: 2.4

- force
        the default is \`yes', which will replace the remote file when contents are different than the source.  If \`no', the file will only be transferred if the destination does not exist.
        [Default: yes]
        type: bool

- group
        Name of the group that should own the file/directory, as would be fed to \`chown'.
        [Default: (null)]

- lstrip_blocks
        If this is set to True leading spaces and tabs are stripped from the start of a line to a block. Setting this option to True requires Jinja2 version >=2.7.
        [Default: no]
        type: bool
        version_added: 2.6

- mode
        Mode the file or directory should be. For those used to \`/usr/bin/chmod' remember that modes are actually octal numbers.  You must either add a leading zero so that Ansible's YAML
        parser knows it is an octal number (like \`0644' or \`01777') or quote it (like \`'644'' or \`'1777'') so Ansible receives a string and can do its own conversion from string into
        number.  Giving Ansible a number without following one of these rules will end up with a decimal number which will have unexpected results.  As of version 1.8, the mode may be
        specified as a symbolic mode (for example, \`u+rwx' or \`u=rw,g=r,o=r').  As of version 2.6, the mode may also be the special string \`preserve'.  \`preserve' means that the file will
        be given the same permissions as the source file.
        [Default: (null)]

- newline_sequence
        Specify the newline sequence to use for templating files.
        (Choices: \\n, \\r, \\r\\n)[Default: \\n]
        version_added: 2.4

- output_encoding
        Overrides the encoding used to write the template file defined by \`dest'.
        It defaults to \`'utf-8'', but any encoding supported by python can be used.
        The source template file must always be encoded using \`'utf-8'', for homogeneity.
        [Default: utf-8]
        version_added: 2.7

- owner
        Name of the user that should own the file/directory, as would be fed to \`chown'.
        [Default: (null)]

- selevel
        Level part of the SELinux file context. This is the MLS/MCS attribute, sometimes known as the \`range'. \`_default' feature works as for \`seuser'.
        [Default: s0]

- serole
        Role part of SELinux file context, \`_default' feature works as for \`seuser'.
        [Default: (null)]

- setype
        Type part of SELinux file context, \`_default' feature works as for \`seuser'.
        [Default: (null)]

- seuser
        User part of SELinux file context. Will default to system policy, if applicable. If set to \`_default', it will use the \`user' portion of the policy if available.
        [Default: (null)]

= src
        Path of a Jinja2 formatted template on the Ansible controller. This can be a relative or absolute path.


- trim_blocks
        If this is set to True the first newline after a block is removed (block, not variable tag!).
        [Default: yes]
        type: bool
        version_added: 2.4

- unsafe_writes
        By default this module uses atomic operations to prevent data corruption or inconsistent reads from the target files, but sometimes systems are configured or just broken in ways
        that prevent this. One example is docker mounted files, which cannot be updated atomically from inside the container and can only be written in an unsafe manner.
        This option allows Ansible to fall back to unsafe methods of updating files when atomic operations fail (however, it doesn't force Ansible to perform unsafe writes). IMPORTANT!
        Unsafe writes are subject to race conditions and can lead to data corruption.
        [Default: no]
        type: bool
        version_added: 2.2

- validate
        The validation command to run before copying into place. The path to the file to validate is passed in via '%s' which must be present as in the example below. The command is passed
        securely so shell features like expansion and pipes won't work.
        [Default: (null)]

- variable_end_string
        The string marking the end of a print statement.
        [Default: }}]
        version_added: 2.4

- variable_start_string
        The string marking the beginning of a print statement.
        [Default: {{]
        version_added: 2.4


NOTES:
      * For Windows you can use [win_template] which uses '\\\r\\\n' as \`newline_sequence'.
      * Including a string that uses a date in the template will result in the template being marked 'changed' each time
      * Since Ansible version 0.9, templates are loaded with \`trim_blocks=True'.
      * Also, you can override jinja2 settings by adding a special header to template file. i.e. \`#jinja2:variable_start_string:'[%', variable_end_string:'%]', trim_blocks: False'
        which changes the variable interpolation markers to  [% var %] instead of  {{ var }}. This is the best way to prevent evaluation of things that look like, but should not be
        Jinja2. raw/endraw in Jinja2 will not work as you expect because templates in Ansible are recursively evaluated.
      * You can use the \`copy' module with the \`content:' option if you prefer the template inline, as part of the playbook.

AUTHOR: Ansible Core Team, Michael DeHaan
        METADATA:
          status:
          - stableinterface
          supported_by: core
        

EXAMPLES:
# Example from Ansible Playbooks
- template:
    src: /mytemplates/foo.j2
    dest: /etc/file.conf
    owner: bin
    group: wheel
    mode: 0644

# The same example, but using symbolic modes equivalent to 0644
- template:
    src: /mytemplates/foo.j2
    dest: /etc/file.conf
    owner: bin
    group: wheel
    mode: "u=rw,g=r,o=r"

# Create a DOS-style text file from a template
- template:
    src: config.ini.j2
    dest: /share/windows/config.ini
    newline_sequence: '\r\n'

# Copy a new "sudoers" file into place, after passing validation with visudo
- template:
    src: /mine/sudoers
    dest: /etc/sudoers
    validate: '/usr/sbin/visudo -cf %s'

# Update sshd configuration safely, avoid locking yourself out
- template:
    src: etc/ssh/sshd_config.j2
    dest: /etc/ssh/sshd_config
    owner: root
    group: root
    mode: '0600'
    validate: /usr/sbin/sshd -t -f %s
    backup: yes
      `,
  },
];
