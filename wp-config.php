<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'newsite' );

/** Database username */
define( 'DB_USER', 'newsite_admin' );

/** Database password */
define( 'DB_PASSWORD', 'lsfAdmin!2025' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'nS::q;:_uC;C%gYTtBqn`rz<x=GUR`oP.M/CD?+uc/B)1T5O~L;/.%/7_aF!_l$;' );
define( 'SECURE_AUTH_KEY',  '2h=}NLYr_kq]orA+^e|]VCxT72:=}_}]B5Sn$Hf+.7+gxVRi,PfIl+~cj>_=Ms_m' );
define( 'LOGGED_IN_KEY',    '8jPCh6o&p?|M?ik:Vw@G*HK`8<WQ`qAS#0bmtxb*`sV`K<Sd&A~Z_s$.!X89nlLg' );
define( 'NONCE_KEY',        '?}hsma_`}KKjv!zdrNAe|bcw~vK.Qt;`*GrP~gdMQv zuz7bV<*j3aIl(;Cw/HB]' );
define( 'AUTH_SALT',        'A$zI)kSz=-A+wB[A[iof.5)yTR%{O+xDMFh6pto$7RQFfXKcM7J5>z~JuY#>cO@N' );
define( 'SECURE_AUTH_SALT', '4R)p#FQ5Zj].5lf=MOrGbku;D6.~`7W^:<E_d@ZR&)RMX@&xm|6=A#(m=P#la <3' );
define( 'LOGGED_IN_SALT',   'R|tm}|hO~B!t*,_N.tbP2vx3rL@+ P[PluX:5hv45Bna}>e-]I|8q5?Kl}x{3OzJ' );
define( 'NONCE_SALT',       'bPlEV`@JR#JUgQDZzn,gtBA)#+}ujjk5amX+2-[[ q9==e1nVg4t!7|&PNh_u}_|' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
