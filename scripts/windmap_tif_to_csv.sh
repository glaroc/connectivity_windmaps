#!bin/bash 

gdal2org.py 
cut -d, -f1-2 --complement rfg_N.csv > rfg_N2.csv
paste -d , rfg_E.csv rfg_N.csv > rfg_EN.csv
psql -h secure.qcbs.ca -p 5432 -U connectivity -d connectivity -c "COPY rfg_en FROM stdin CSV" < rfg_EN.csv