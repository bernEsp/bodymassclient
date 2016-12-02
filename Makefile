dev : bundle.js main.css

bundle.js : src/* src/*/*
	browserify \
	-t [ envify ] \
	-t [ browserify-ngannotate --add ] \
	-t [ stringify --extensions [.html] ] \
	src/main.js | sed "s/[\"']ngInject[\"'];*//g" > bundle.js

bundle-min.js : bundle.js
	java \
	-jar ./node_modules/google-closure-compiler/compiler.jar \
	--js bundle.js \
	--js_output_file bundle-min.js \
	--jscomp_off=misplacedTypeAnnotation \
	--language_out=ES5

main.css : styles/sass/*.scss
	node-sass \
	--recursive \
	--output-style compressed \
	styles/sass/main.scss > main.css

clean :
	rm -rf public
	rm bundle*js
	rm main.css

build-dist: bundle-min.js main.css
	mkdir -p public
	mkdir -p public/images
	gzip < index.html > public/index.html
	gzip < bundle-min.js > public/bundle.js
	gzip < main.css > public/main.css
	for f in images/*; do gzip < $$f > public/$$f;  done

build-dist-prod : bundle-min.js main.css
	mkdir -p public
	mkdir -p public/images
	cp index.html public/index.html
	cp bundle-min.js public/bundle.js
	cp main.css public/main.css

deploy-prod : clean build-dist-prod
