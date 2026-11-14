#!/bin/sh
set -eu
umask 077
mkdir -p .runtime
if [ ! -f .runtime/service.key ]; then
  (set -C; openssl rand -hex 32 > .runtime/service.key)
fi
printf 'UG_SERVICE_KEY=%s\n' "$(cat .runtime/service.key)" > .runtime/compose.env
printf '%s\n' 'Clave interna preparada. No se ha arrancado ni eliminado ningún contenedor.'
