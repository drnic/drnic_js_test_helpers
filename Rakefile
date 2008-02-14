require 'rubygems'
begin
  require 'rake'
rescue LoadError
  puts 'This script should only be accessed via the "rake" command.'
  puts 'Installation: gem install rake -y'
  exit
end
require 'rake/clean'

Dir['tasks/**/*.rake'].each { |rake| load rake }

require 'rake'
require 'rake/packagetask'

APP_ROOT     ||= File.expand_path(File.dirname(__FILE__))
APP_SRC_DIR  = File.join(APP_ROOT, 'src')
APP_DIST_DIR = File.join(APP_ROOT, 'dist')
APP_PKG_DIR  = File.join(APP_ROOT, 'pkg')
APP_VERSION  = '0.0.1'

task :default => [:dist, :package, :clean_package_source]

desc "Builds the distribution"
task :dist do
  $:.unshift File.join(APP_ROOT, 'lib')
  require 'protodoc'
  require 'fileutils'
  FileUtils.mkdir_p APP_DIST_DIR
  
  Dir.chdir(APP_SRC_DIR) do
    File.open(File.join(APP_DIST_DIR, 'drnic_js_test_helpers.js'), 'w+') do |dist|
      dist << Protodoc::Preprocessor.new('drnic_js_test_helpers.js')
    end
  end
end

Rake::PackageTask.new('drnic_js_test_helpers', APP_VERSION) do |package|
  package.need_tar_gz = true
  package.package_dir = APP_PKG_DIR
  package.package_files.include(
    '[A-Z]*',
    'dist/drnic_js_test_helpers.js',
    'lib/**',
    'src/**',
    'test/**'
  )
end
