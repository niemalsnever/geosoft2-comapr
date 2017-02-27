#!/bin/bash
echo "***** ***** Installing GDAL extension (including scidb driver)"
apt-get install -qq --fix-missing -y --force-yes git libtiff-dev libjpeg8-dev libpng12-dev libnetpbm10-dev libhdf5-dev libhdf4-alt-dev libpython-all-dev libnetcdf-dev libproj-dev  libhdf5-dev libpython-dev

cd /tmp
git clone https://github.com/appelmar/scidb4gdal.git --branch dev
cd scidb4gdal
chmod +x build/prepare_platform.sh
build/prepare_platform.sh
cd gdaldev && ./configure --with-python && make -j 2 && make install
ldconfig
