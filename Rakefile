require 'rubygems'
begin
  require 'rake'
rescue LoadError
  puts 'This script should only be accessed via the "rake" command.'
  puts 'Installation: gem install rake -y'
  exit
end
require 'rake'
require 'rake/clean'
require 'rake/packagetask'

$:.unshift File.dirname(__FILE__) + "/lib"

APP_ROOT     = File.expand_path(File.dirname(__FILE__))
APP_SRC_DIR  = File.join(APP_ROOT, 'src')
APP_DIST_DIR = File.join(APP_ROOT, 'dist')
APP_PKG_DIR  = File.join(APP_ROOT, 'pkg')
APP_VERSION  = '0.0.1'
unless ENV['rakefile_just_config']

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
    'config/*.sample',
    'dist/drnic_js_test_helpers.js',
    'lib/**',
    'src/**',
    'script/**',
    'tasks/**',
    'test/**',
    'website/**'
  )
end

desc "Builds the distribution, runs the JavaScript unit tests and collects their results."
task :test => [:dist, :test_units]

require 'jstest'
desc "Runs all the JavaScript unit tests and collects the results"
JavaScriptTestTask.new(:test_units) do |t|
  testcases        = ENV['TESTCASES']
  tests_to_run     = ENV['TESTS']    && ENV['TESTS'].split(',')
  browsers_to_test = ENV['BROWSERS'] && ENV['BROWSERS'].split(',')
  
  t.mount("/dist")
  t.mount("/src")
  t.mount("/test")
  
  Dir["test/*_test.html"].sort.each do |test_file|
    tests = testcases ? { :url => "/#{test_file}", :testcases => testcases } : "/#{test_file}"
    test_filename = test_file[/.*\/(.+?)\.html/, 1]
    t.run(tests) unless tests_to_run && !tests_to_run.include?(test_filename)
  end
  
  %w( safari firefox ie konqueror opera ).each do |browser|
    t.browser(browser.to_sym) unless browsers_to_test && !browsers_to_test.include?(browser)
  end
end

task :clean_package_source do
  rm_rf File.join(APP_PKG_DIR, "'drnic_js_test_helpers'-#{APP_VERSION}")
end

Dir['tasks/**/*.rake'].each { |rake| load rake }

end