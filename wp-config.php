<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'webuser');

/** MySQL database username */
define('DB_USER', 'webuser');

/** MySQL database password */
define('DB_PASSWORD', 'water19961016');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'zv`; /}?+EE?46p#;WiX(X=:B5tf/]1$`OYd1s$U0$80`:T5h@fi1wPBC1tZzEfU');
define('SECURE_AUTH_KEY',  'We7dGZRMZ%J0j{,>W_SK#K_7i0rJ59pN6+~J* /t~y$vaAJ&AZT`%EV|vzuqK5~(');
define('LOGGED_IN_KEY',    '6Z:nOO0QtQy|nM[|s=Vq}Q %P|hO*#AKZqkl2<~;=L<ykaM:{a71VH2wI%AIOqf%');
define('NONCE_KEY',        ']/a|m8lu[Q0k6_q_Ct;Nx6M3UK1Py#BzvE%(gYQw/pEt]77&|:&;;FBG![AM8e~m');
define('AUTH_SALT',        'A!Zg$Tz]&=U1_7]I%G]Q8TBspYzy*0mmf~0L{%%$m[<[MrFSxPLD$[U/DMb3~$1-');
define('SECURE_AUTH_SALT', 'S%ld&E3<1{~t~1O.ODgpj:1{ktXU(4kaqUH/xG9WyJv2?*~]`/dw|,@}PLsnqI#T');
define('LOGGED_IN_SALT',   ':J,*m<A6HQi1*.C%,X]_JFXVyy5R2j*G)PC]/.F#Evs1T`Z587Om-{{6.kuXW;+!');
define('NONCE_SALT',       'pPV,IiHFkyP1].[=ve|dZBs?MAEZ`&E+ J[Xv7#kQj*]Ku+c6I@w3VpCHrw4C)b4');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
