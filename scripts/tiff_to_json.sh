#!bin/bash

OPTS=`getopt -o n:e:s:r:w:x:y:z:o: --long north:,east:,s_srs:,resolution:,lx:,ux:,ly:,uy:,output: -n 'parse-options' -- "$@"`

if [ $? != 0 ] ; then echo "Failed parsing options." >&2 ; exit 1 ; fi

eval set -- "$OPTS"

while true; do
  case "$1" in
    -n | --north ) north="$2" shift 2 ;;
    -e | --east ) east="$2"; shift 2 ;;
    -s | --s_srs ) s_srs="$2"; shift 2 ;; #Output CRS EPSG
    -r | --resolution ) tr="$2"; shift 2 ;; #resolution
    -w | --lx ) lx="$2"; shift 2 ;; #Lower x
    -x | --ux ) ux="$2"; shift 2 ;; #Upper X
    -y | --ly ) ly="$2"; shift 2 ;; #Lower y
    -z | --uy ) uy="$2"; shift 2 ;; #Upper y
    -o | --output ) output="$2"; shift 2 ;;
    -- ) shift; break ;;
    * ) break ;;
  esac
done
gdalwarp -s_srs EPSG:$s_srs -overwrite -t_srs EPSG:$s_srs -tr $tr $tr -r bilinear -te $lx $ly $ux $uy -of GTiff $east _E.tif
gdalwarp -s_srs EPSG:$s_srs -overwrite -t_srs EPSG:4326 _E.tif _E_ll.tif
bounds=$(gdalinfo _E_ll.tif | awk '/(Upper Left)|(Lower Right)/' | awk '{gsub(/,|\)|\(/," ");print $3 " " $4}' | sed ':a;N;$!ba;s/\n/ /g')
res=$(gdalinfo _E_ll.tif | awk '/(Pixel Size = )/' | awk '{gsub(/,|\)|\(/," ");print $4}')
rowscols=$(gdalinfo _E_ll.tif | awk '/(Size is)/' | awk '{gsub(/,/," ");print $3 " " $4}')
echo $rowscols
min=$(gdalinfo -stats _E_ll.tif | awk '/(STATISTICS_MINIMUM)/' | awk '{gsub(/=/," ");print $2}')
max=$(gdalinfo -stats _E_ll.tif | awk '/(STATISTICS_MAXIMUM)/' | awk '{gsub(/=/," ");print $2}')
#gdal_calc.py -A _E_ll.tif --calc="numpy.maximum(0,1e13*numpy.power(A,2)-200)" --outfile=_E_lls.tif
gdal_calc.py -A _E_ll.tif --calc="1000000*A*(A!=255)" --outfile=_E_lls.tif --NoDataValue=0
gdal_translate -of AAIGrid -ot Byte -a_nodata 0 _E_lls.tif _E.asc
sed '1,6d' _E.asc > _E.txt
tr -d "\n\r" < _E.txt > _E2.txt
sed -i -e 's/ /, /g' _E2.txt
sed -i -e 's/2147483647/0/g' _E2.txt
sed -i -e '1s/^.//' _E2.txt
nx=$(echo $rowscols | awk '{print $1;}')
sed -e "s/NX_HERE/$nx/g" template_windmap.json > $output
ny=$(echo $rowscols | awk '{print $2;}')
sed -i -e "s/NY_HERE/$ny/g" $output
minx=$(echo $bounds | awk '{print $1;}')
sed -i -e "s/MIN_X_HERE/$minx/g" $output
maxy=$(echo $bounds | awk '{print $2;}')
sed -i -e "s/MAX_Y_HERE/$maxy/g" $output
maxx=$(echo $bounds | awk '{print $3;}')
sed -i -e "s/MAX_X_HERE/$maxx/g" $output
miny=$(echo $bounds | awk '{print $4;}')
sed -i -e "s/MIN_Y_HERE/$miny/g" $output
sed -i -e "s/RES_HERE/$res/g" $output
sed -i -e '/EAST_HERE/{r _E2.txt' -e 'd}' $output
mv _E_lls.tif tmp.tif
rm _E*.*

gdalwarp -s_srs EPSG:$s_srs -overwrite -t_srs EPSG:$s_srs -tr $tr $tr -r bilinear -te $lx $ly $ux $uy -of GTiff $north _E.tif
gdalwarp -s_srs EPSG:$s_srs -overwrite -t_srs EPSG:4326 _E.tif _E_ll.tif
#gdal_calc.py -A _E_ll.tif --calc="numpy.maximum(0,1e13*numpy.power(A,2)-200)" --outfile=_E_lls.tif
gdal_calc.py -A _E_ll.tif --calc="1000000*A*(A!=255)" --outfile=_E_lls.tif --NoDataValue=0
gdal_translate -of AAIGrid -ot Byte -a_nodata 0 _E_lls.tif _E.asc
sed '1,6d' _E.asc > _E.txt
tr -d "\n\r" < _E.txt > _E2.txt
sed -i -e 's/ /, /g' _E2.txt
sed -i -e 's/2147483647/0/g' _E2.txt
sed -i -e '1s/^.//' _E2.txt
sed -i -e '/NORTH_HERE/{r _E2.txt' -e 'd}' $output
rm _E*.*